import { OpenTelemetryModule } from 'nestjs-otel';

export const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
      ignoreRoutes: ['/metrics', '/favicon.ico'],
    },
  },
});
