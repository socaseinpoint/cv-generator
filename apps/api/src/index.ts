import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB, disconnectDB } from './db.js';
import { registerRoutes } from './routes.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const HOST = process.env.HOST || '0.0.0.0';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
await app.register(cors, {
  origin: true, // Allow all origins in development
  credentials: true,
});

// Connect to database
await connectDB();

// Register routes
await registerRoutes(app);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDB();
  await app.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDB();
  await app.close();
  process.exit(0);
});

// Start server
try {
  await app.listen({ port: PORT, host: HOST });
  console.log(`🚀 API Server running at http://${HOST}:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}





