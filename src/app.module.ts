import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './app/users/users.controller';
import { ProductController } from './app/product/product.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ProductController],
  providers: [AppService],
})
export class AppModule {}
