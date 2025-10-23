/**
 * NestJS Main Entry Point
 * 
 * Bootstraps the application
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  
  // Enable CORS
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  const PORT = process.env.PORT || 3000;
  
  await app.listen(PORT);
  
  console.log(`\n🚀 NestJS + Cost Katana API Server`);
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`\n📚 Available Endpoints:`);
  console.log(`   POST   http://localhost:${PORT}/api/chat       - Chat with AI`);
  console.log(`   POST   http://localhost:${PORT}/api/optimize   - Optimize prompt`);
  console.log(`   GET    http://localhost:${PORT}/api/analytics  - Get analytics`);
  console.log(`   GET    http://localhost:${PORT}/api/health     - Health check`);
  console.log(`\n📊 View dashboard: https://costkatana.com/dashboard\n`);
}

bootstrap();

