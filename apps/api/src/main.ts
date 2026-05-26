import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Security headers
  app.use(helmet());

  // CORS - strict configuration
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map(origin => origin.trim());

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // In development, allow localhost without strict checking
      if (process.env.NODE_ENV === 'development') return callback(null, true);

      // Check against allowed origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation - only in non-production
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Leverage by Lerar API')
      .setDescription('Global Trade Operating System API')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('companies', 'Company management')
      .addTag('products', 'Product catalog')
      .addTag('orders', 'Order management')
      .addTag('payments', 'Payment processing')
      .addTag('documents', 'Trade documents')
      .addTag('compliance', 'Compliance engine')
      .addTag('freight', 'Freight & logistics')
      .addTag('ai', 'AI services')
      .addTag('messaging', 'Real-time messaging')
      .addTag('analytics', 'Analytics')
      .addTag('ads', 'Advertising')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  // Graceful shutdown
  app.enableShutdownHooks();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📚 API docs: http://localhost:${port}/api/docs`);
  }
}

bootstrap();
