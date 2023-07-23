import { IntegrationException } from '@common/exceptions/integration.exception';
import { HttpStatus } from '@nestjs/common';

/**
 * Handle internal error
 *
 * Filter exception handle status code 500
 */
export function handlIntegrationError(
  result: any,
  message: string,
  status: number = HttpStatus.BAD_GATEWAY,
) {
  if (!result) {
    throw new IntegrationException(message, status);
  }
}
