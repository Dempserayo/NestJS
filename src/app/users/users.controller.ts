import { Controller, Get, Param, NotFoundException, Post, Body, Delete, Put, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from 'src/models/dto/user/user.dto';

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
      name: 'dempserayo',
      email: 'nestjs2@gmail.com',
    },
    {
      id: '3',
      name: 'user test',
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
      throw new NotFoundException(`User with id ${id}  not found`);
    }

    if (user.id === '1') {
      throw new ForbiddenException(`You are not allowed to access this user`);
    }

    // Probe los diferentes exceptions que hay en la documentacion oficial de NestJS, interesante, nada que agregar.
    // BadRequestException 400
    // UnauthorizedException 401
    // NotFoundException 404
    // ForbiddenException 403
    // BadRequestException 403
    // NotAcceptableException 406 - Not Acceptable
    // RequestTimeoutException 408 - Request Timeout
    // ConflictException 409 - Conflict
    // GoneException 410 - Gone
    // HttpVersionNotSupportedException 505 - HTTP Version Not Supported
    // PayloadTooLargeException 413 - Payload too large
    // UnsupportedMediaTypeException 415 - Unsupporte media type
    // UnprocessableEntityException 422 - Unprocessable Entity
    // InternalServerErrorException 500 - Internal Server Error
    // NotImplementedException 500 - Internal Server Error
    // ImATeapotException 418 - Im a teapol
    // MethodNotAllowedException 405 - Method not Allowed
    // BadGatewayException 502 - Bad Gateway
    // ServiceUnavailableException 503 - Service Unvaliable
    // GatewayTimeoutException 504
    // PreconditionFailedException 412

    return user;
  }

  // Primer modo de Post para crear usuarios, lo malo es que toca ingresar el ID a cada usuario que vayamos a crear y esto no es optimo.
  // si tuvieramos que crear mil usuarios, tendriamos que uno por uno ir dandole un ID y llevar un control sobre que ID tiene cada uno.
  @Post()
  createUser(@Body() body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Con esta forma, podemos saber cual es el ID o ultimo elemento agregado y seguido de esto el ID de nuestro nuevo usuario sera el que le siga.
  // sin tener que agregarlo, solo tendriamos que agregar nuestro nombre y email, ya el ID se estaria acomodando solo, en base al orden de nuestra lista de usuarios.
  // @Post()
  // createUser(@Body() body: Omit<User, 'id'>) {
  //   const lastUser = this.users[this.users.length - 1];
  //   const newId = lastUser ? (Number(lastUser.id) + 1).toString() : '1';

  //   const newUser: User = {
  //     id: newId,
  //     name: body.name,
  //     email: body.email,
  //   };

  //   this.users.push(newUser);
  //   return newUser;
  // }

  // Investigando me di cuenta que es mala practica? el tener que crear nuevamente una lista sin añadir lo que que se supone voy a eliminar, pues al hacer esto
  // se puede volver un poco tedioso y delicado si contamos con informacion importante.
  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   this.users = this.users.filter( (user) => user.id !== id);
  //   return {
  //     message: 'Usuario eliminado',
  //   };
  // }

  // La mejor manera para ejecutar un delete es basicamente usar .splice que ya directamente busca el id y lo borra, sin tener que mover otros datos.
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // ← Aquí sí lo borra del arreglo ORIGINAL
    this.users.splice(index, 1);
    return { message: 'Usuario eliminado correctamente' };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      return {
        error: 'User not found',
      };
    }

    const currentData = this.users[position];
    const email = changes?.email;
    if (email && !email.includes('@')) {
      throw new UnprocessableEntityException('Email is not valid');
    }
    const updateDataUser = {
      ...currentData,
      ...changes,
    };

    this.users[position] = updateDataUser;
    return updateDataUser;
  }
}
