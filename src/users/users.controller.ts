import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'miguel angel',
      email: 'nestjs@gmail.com',
    },
    {
      id: '2',
      name: 'angie jaimes',
      email: 'nestjs2@gmail.com',
    },
    {
      id: '3',
      name: 'silvia parra',
      email: 'nestjs2@gmail.com',
    },
    {
      id: '4',
      name: 'antonio jaimes',
      email: 'nestjs2@gmail.com',
    },
    {
      id: '5',
      name: 'johan jimenez',
      email: 'nestjs2@gmail.com',
    },
    {
      id: '6',
      name: '',
      email: 'nestjs2@gmail.com',
    },
  ];

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}
