import { ERROR_DEFAULT } from '@common/constants';

/**
 * Handle internal error
 *
 * Filter exception handle status code 500
 */
export function handleDefaultError(result: any, message?: string) {
  if (!result) {
    throw new Error(message ?? ERROR_DEFAULT);
  }
}
