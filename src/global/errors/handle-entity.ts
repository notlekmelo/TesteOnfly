import { UnprocessableEntityException } from '@nestjs/common';

/**
 * Handle error 422 business rule
 */
export function handleEntity(result: any, message?: string) {
  if (!result) {
    throw new UnprocessableEntityException([message ?? 'Entity unprocessable']);
  }
}
