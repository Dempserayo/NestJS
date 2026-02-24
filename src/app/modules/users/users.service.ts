import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from 'src/models/dto/user/user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'miguel angel',
      email: 'nestjs@gmail.com',
    },
    {
      id: '2',
      name: 'dempserayo',
      email: 'nestjs2@gmail.com',
    },
    {
      id: '3',
      name: 'user test',
      email: 'nestjs2@gmail.com',
    },
  ];
  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];
    if (user.id === '1') {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  delete(id: string) {
    const position = this.findOne(id);
    this.users.splice(position, 1);
    return { message: 'User deleted' };
  }

  update(id: string, changes: UpdateUserDto) {
    const position = this.findOne(id);
    const currentData = this.users[position];
    const updateDataUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updateDataUser;
    return updateDataUser;
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id}  not found`);
    }
    return position;
  }
}
