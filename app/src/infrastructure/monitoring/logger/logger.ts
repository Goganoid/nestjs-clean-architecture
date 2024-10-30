import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { context, trace } from '@opentelemetry/api';
import { randomUUID } from 'crypto';
import type { Params } from 'nestjs-pino';
import pino from 'pino';
import type { Options } from 'pino-http';
import pinoLoki from 'pino-loki';
import pinoPretty from 'pino-pretty';
import type {
  SerializedError,
  SerializedRequest,
  SerializedResponse,
} from 'pino-std-serializers';

function createPrettyEntry(app: string, level: pino.Level) {
  const stream = pinoPretty({
    colorize: true,
    singleLine: true,
  });
  return { level, stream, labels: { app } };
}

function createLokiEntry(app: string, level: pino.Level, host: string) {
  const stream = pinoLoki({
    replaceTimestamp: true,
    batching: true,
    interval: 5,

    host,

    labels: { app },
  });
  return { level, stream };
}

function getMultiDestinationStream(
  app: string,
  level: pino.Level = 'info',
  loki?: string,
) {
  const entries: pino.StreamEntry[] = [createPrettyEntry(app, level)];
  if (loki) entries.push(createLokiEntry(app, level, loki));

  return pino.multistream(entries);
}

function getFormatters() {
  return {
    level: (label: string) => {
      return { level: label };
    },
    // Workaround for PinoInstrumentation (does not support latest version yet)
    // https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1747
    log(object: Record<string, unknown>) {
      const span = trace.getSpan(context.active());
      if (!span) return object;
      const spanContext = trace.getSpan(context.active())?.spanContext();
      if (!spanContext) return object;

      const { spanId, traceId } = spanContext;
      return { ...object, spanId, traceId, span_id: spanId, trace_id: traceId };
    },
  };
}

/**
 * custom-serializers
 * https://github.com/pinojs/pino-http?tab=readme-ov-file#custom-serializers--custom-log-attribute-keys
 * @returns
 */
function getSerializers() {
  return {
    req(req: SerializedRequest) {
      const serializedReq = {
        id: req.id,
        method: req.method,
        url: req.url,
        userId: undefined,
      };
      return serializedReq;
    },
    res(response: SerializedResponse) {
      const { statusCode: status, ...serialized } = response;
      return Object.assign({ status }, serialized);
    },
    err(_err: SerializedError) {
      const serialized = {
        ..._err,
      };
      return serialized;
    },
  };
}

function getPinoHttpOption(level: string = 'info'): Options {
  return {
    level,
    quietReqLogger: false,
    timestamp: pino.stdTimeFunctions.isoTime,
    customAttributeKeys: {
      req: 'req',
      res: 'res',
      err: 'err',
      responseTime: 'taken(ms)',
    },
    formatters: getFormatters(),
    serializers: getSerializers(),
    genReqId: function (req, res) {
      const reqId = req.id ?? req.headers['x-request-id'];
      if (reqId) return reqId;
      const id = randomUUID();
      res.setHeader('X-Request-Id', id);
      return id;
    },
    // TODO: include JWT from header here
    redact: {
      paths: [
        'password',
        'reqBody.password',
        'user.password',
        'reqBody.user.password',
      ],
    },
  };
}

export function getLoggerModuleOptions(configService: ConfigService): Params {
  const app = configService.get('OTLP_SERVICE_NAME') || 'app';
  const level = 'trace';
  const loki = 'http://localhost:3100';

  return {
    pinoHttp: [
      getPinoHttpOption(level),
      getMultiDestinationStream(app, level, loki),
    ],
    exclude: [
      { method: RequestMethod.GET, path: '/health' },
      { method: RequestMethod.GET, path: '/metrics' },
    ],
  };
}
