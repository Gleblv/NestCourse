import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationExeption extends HttpException {
  messages: string[];

  constructor(response: any) {
    super(response, HttpStatus.BAD_REQUEST);

    this.message = response;
  }
}
