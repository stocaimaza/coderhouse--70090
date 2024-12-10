import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Mundo! Bienvenidos a Nest! El futuro en tus manos';
  }
}
