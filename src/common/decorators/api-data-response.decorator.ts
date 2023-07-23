import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface IResponseDecoratorApiResponse<T> {
  type: Type<any | T>;
  isArray?: boolean;
  description?: string;
  status?: HttpStatus;
}
/**
 * Response data swagger docs
 */
export const ApiDataResponse = <TModel extends Type<any>>(
  options: IResponseDecoratorApiResponse<any | TModel>,
) => {
  const status = options.status ?? HttpStatus.OK;
  let response = ApiResponse({
    status: status,
    description: options.description || HttpStatus[status],
    schema: {
      properties: {
        data: {
          $ref: getSchemaPath(options.type),
        },
      },
    },
  });
  if (options.isArray === true) {
    response = ApiResponse({
      status: status,
      description: options.description || HttpStatus[status],
      schema: {
        properties: {
          data: {
            properties: {
              count: { type: 'number' },
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        },
      },
    });
  }

  return applyDecorators(ApiExtraModels(options.type), response);
};
