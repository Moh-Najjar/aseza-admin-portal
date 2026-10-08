import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the admin front-end
  app.enableCors();

  // Global validation pipe — strips unknown fields and validates DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Wrap every successful response in { success, statusCode, message, data, timestamp }
  app.useGlobalInterceptors(new TransformInterceptor());

  // Wrap every error in { success: false, statusCode, message, error, path, timestamp }
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger UI at /api/docs, raw OpenAPI JSON at /api/docs-json
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ASEZA Admin Portal API')
    .setDescription('Admin API for users, directorates, forms and lookups')
    .setVersion('1.0')
    // Adds the "Authorize" button; paste the accessToken returned by POST /auth/login
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  });

  // HOST=0.0.0.0 exposes the API on your LAN IP (same idea as React HOST)
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '0.0.0.0';

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error(`Invalid PORT value: ${String(process.env.PORT)}`);
  }

  await app.listen(port, host);
  console.log(`Admin API is running on http://${host}:${String(port)}`);
}

void bootstrap();
