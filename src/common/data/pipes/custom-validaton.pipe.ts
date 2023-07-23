import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 * Custom validation
 */
export class CustomValidation extends ValidationPipe {
  constructor() {
    super({ transform: true });
  }
  /**
   * Transform data
   */
  override async transform(value: any, metadata: ArgumentMetadata) {
    //handle default
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metadata)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errorsList = await validate(object);
    if (errorsList.length > 0) {
      const message = [];
      for (const error of errorsList) {
        const errorsObject = error.constraints;
        const { isNotEmpty } = errorsObject;
        if (isNotEmpty) {
          const parameter = isNotEmpty.split(' ')[0];
          message.push({
            title: `Parameter ${parameter} required`,
            parameter: `${parameter}`,
          });
        }
      }
    }
    return value;
  }
}
