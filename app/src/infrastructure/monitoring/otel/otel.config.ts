import { OpenTelemetryModule } from 'nestjs-otel';

export const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: false,
      ignoreRoutes: ['/metrics', '/favicon.ico'],
    },
  },
});
