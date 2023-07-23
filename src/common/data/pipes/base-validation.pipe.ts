import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { JwtPayload } from '../../../modules/auth/dto';
/**
 * Base pipe validation
 */
@Injectable({ scope: Scope.REQUEST })
export abstract class BaseValidationPipe implements PipeTransform<any> {
  constructor(
    @Inject(REQUEST) protected request: Request,
    protected allowEmpty = false,
    protected injectUsuario: boolean = true,
  ) {}

  /**
   * Usuario from request (extract from AuthGuard)
   */
  get user(): JwtPayload {
    return this.request.user as any;
  }
  /**
   * Validate
   */
  abstract validate(data: any): any;

  /**
   * Handle data
   */
  transformData(data: any): any {
    return data;
  }

  /**
   * Transform data
   */
  async transform(value: any, metadata: ArgumentMetadata) {
    //check body
    if (value instanceof Object && this.isEmpty(value)) {
      if (this.allowEmpty === false) {
        throw new BadRequestException(`Validation failed: No Body provided`);
      }
    }
    //validate
    await this.validate(value);
    //transform data
    await this.transformData(value);
    //handle default
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
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
      if (message.length > 0) {
        throw new BadRequestException(message);
      }
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }
  /**
   * Extract params in path
   */
  getParamId(): number | string {
    const id: any = this.request.params['id'];
    if (isNaN(id)) {
      if (id === ':id') {
        return null;
      }
      return id;
    }
    return parseInt(id);
  }

  protected _validateEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  protected _validateCpf(cpf: string) {
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    return regex.test(cpf);
  }

  protected _validateCnpj(cnpj: string) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    return regex.test(cnpj);
  }

  protected _validateUrl(url: string) {
    const regex =
      /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(url);
  }
}
