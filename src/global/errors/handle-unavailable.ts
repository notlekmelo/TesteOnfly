import { ServiceUnavailableException } from '@nestjs/common';

/**
 * Handle error 503 business rule
 */
export function handleUnavailable(result: any, message?: string) {
  if (!result) {
    throw new ServiceUnavailableException([message ?? 'Service unavailable']);
  }
}
