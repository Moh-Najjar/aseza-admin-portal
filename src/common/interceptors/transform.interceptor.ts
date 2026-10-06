import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

/** Interceptor that wraps every successful response in { success, statusCode, message, data, timestamp } */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T> | void
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T> | void> {
    const httpResponse = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data): ApiResponse<T> | void => {
        // 204 No Content — do not add a body, return nothing
        if (httpResponse.statusCode === 204) {
          return;
        }

        return {
          success: true,
          statusCode: httpResponse.statusCode,
          message: resolveMessage(httpResponse.statusCode),
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

/** Maps common HTTP status codes to a short human-readable message */
function resolveMessage(statusCode: number): string {
  const messages: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
  };
  return messages[statusCode] ?? 'OK';
}
