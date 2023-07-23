import { PageDto } from '@common/dto/page.dto';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

interface IPaginatedDecoratorApiResponse<T> {
  type: Type<any & T>;
  description?: string;
}
/**
 * Response pagination swagger docs
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  options: IPaginatedDecoratorApiResponse<TModel>,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto<TModel>, options.type),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: options.description || 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        ],
      },
    }),
  );
};
