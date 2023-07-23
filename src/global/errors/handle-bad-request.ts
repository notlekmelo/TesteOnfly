import { BadRequestException } from '@nestjs/common';

/**
 * Handle error 400 business rule
 */
export function handleBadRequest(result: any, message?: string) {
  if (!result) {
    throw new BadRequestException([message ?? 'Bad request']);
  }
}
