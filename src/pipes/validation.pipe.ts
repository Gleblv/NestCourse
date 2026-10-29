import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationExeption } from '../exception/validation.exception.js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    if (!metatype) {
      return value;
    }

    const obj = plainToInstance(metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(
        (error) => `${error.property} - ${Object.values(error.constraints ?? {}).join(', ')}`,
      );

      throw new ValidationExeption(messages);
    }

    return value;
  }
}
