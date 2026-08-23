import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../interfaces/api-response.interface';

/**
 * Global exception filter — catches every thrown exception (HTTP or otherwise)
 * and formats it into the standard ApiErrorResponse envelope.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determine status code and message from the exception
    let statusCode: number;
    let message: string | string[];
    let errorLabel: string;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      // NestJS HttpException.getResponse() returns string | object
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        // e.g. throw new NotFoundException('some text')
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        // e.g. ValidationPipe returns { message: string[], error: string, statusCode: number }
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = Array.isArray(responseObj['message'])
          ? (responseObj['message'] as string[])
          : typeof responseObj['message'] === 'string'
            ? responseObj['message']
            : exception.message;
      } else {
        message = exception.message;
      }

      errorLabel = HttpStatus[statusCode] ?? 'HttpException';
    } else {
      // Non-HTTP exception (e.g. DB driver crash, unhandled TypeError)
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      errorLabel = 'InternalServerError';

      // Log the full stack trace — this is unexpected and should be investigated
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ApiErrorResponse = {
      success: false,
      statusCode,
      message,
      error: errorLabel,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(body);
  }
}
