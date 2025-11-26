import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from './db.js';
import { generatePDF } from './pdf-generator.js';
import { StyleType } from './styles.js';

const CreateCvSchema = z.object({
  title: z.string().min(1),
  markdownContent: z.string().min(1),
});

const UpdateCvSchema = z.object({
  title: z.string().min(1).optional(),
  markdownContent: z.string().min(1).optional(),
});

const GeneratePdfSchema = z.object({
  style: z.enum(['classic', 'modern', 'minimal']),
});

export async function registerRoutes(app: FastifyInstance) {
  // Create CV
  app.post('/api/cv', async (request, reply) => {
    try {
      const body = CreateCvSchema.parse(request.body);
      
      const cv = await prisma.cvDocument.create({
        data: {
          title: body.title,
          markdownContent: body.markdownContent,
        },
      });
      
      return reply.code(201).send(cv);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({ error: 'Invalid request body', details: error.errors });
      }
      throw error;
    }
  });

  // List all CVs
  app.get('/api/cv', async (request, reply) => {
    const cvs = await prisma.cvDocument.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return reply.send(cvs);
  });

  // Get specific CV
  app.get<{ Params: { id: string } }>('/api/cv/:id', async (request, reply) => {
    const { id } = request.params;
    
    const cv = await prisma.cvDocument.findUnique({
      where: { id },
    });
    
    if (!cv) {
      return reply.code(404).send({ error: 'CV not found' });
    }
    
    return reply.send(cv);
  });

  // Update CV
  app.put<{ Params: { id: string } }>('/api/cv/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const body = UpdateCvSchema.parse(request.body);
      
      const cv = await prisma.cvDocument.update({
        where: { id },
        data: body,
      });
      
      return reply.send(cv);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({ error: 'Invalid request body', details: error.errors });
      }
      if ((error as any).code === 'P2025') {
        return reply.code(404).send({ error: 'CV not found' });
      }
      throw error;
    }
  });

  // Delete CV
  app.delete<{ Params: { id: string } }>('/api/cv/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      
      await prisma.cvDocument.delete({
        where: { id },
      });
      
      return reply.code(204).send();
    } catch (error) {
      if ((error as any).code === 'P2025') {
        return reply.code(404).send({ error: 'CV not found' });
      }
      throw error;
    }
  });

  // Generate PDF
  app.post<{ Params: { id: string } }>('/api/cv/:id/generate', async (request, reply) => {
    try {
      const { id } = request.params;
      const body = GeneratePdfSchema.parse(request.body);
      
      const cv = await prisma.cvDocument.findUnique({
        where: { id },
      });
      
      if (!cv) {
        return reply.code(404).send({ error: 'CV not found' });
      }
      
      const pdfBuffer = await generatePDF(cv.markdownContent, body.style as StyleType);
      
      return reply
        .header('Content-Type', 'application/pdf')
        .header('Content-Disposition', `attachment; filename="${cv.title}_${body.style}.pdf"`)
        .send(pdfBuffer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({ error: 'Invalid request body', details: error.errors });
      }
      throw error;
    }
  });

  // Health check
  app.get('/health', async (request, reply) => {
    return reply.send({ status: 'ok', timestamp: new Date().toISOString() });
  });
}





