import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Env } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('my-test')
  getMyTest() {
    const myVar = this.configService.get<string>('MY_VAR', { infer: true });
    const message = this.appService.getHello();
    return `${message} ${myVar}`;
  }
}
