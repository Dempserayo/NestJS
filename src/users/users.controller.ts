import { Controller, Get, Param, NotFoundException, Post, Body, Delete } from '@nestjs/common';

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
    return user
      ? user
      : (() => {
          throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        })();
  }

  // Primer modo de Post para crear usuarios, lo malo es que toca ingresar el ID a cada usuario que vayamos a crear y esto no es optimo.
  // si tuvieramos que crear mil usuarios, tendriamos que uno por uno ir dandole un ID y llevar un control sobre que ID tiene cada uno.
  // @Post()
  // createUser(@Body() body: User) {
  //   this.users.push(body);
  //   return body;
  // }

  // Con esta forma, podemos saber cual es el ID o ultimo elemento agregado y seguido de esto el ID de nuestro nuevo usuario sera el que le siga.
  // sin tener que agregarlo, solo tendriamos que agregar nuestro nombre y email, ya el ID se estaria acomodando solo, en base al orden de nuestra lista de usuarios.
  @Post()
  createUser(@Body() body: Omit<User, 'id'>) {
    const lastUser = this.users[this.users.length - 1];
    const newId = lastUser ? (Number(lastUser.id) + 1).toString() : '1';

    const newUser: User = {
      id: newId,
      name: body.name,
      email: body.email,
    };

    this.users.push(newUser);
    return newUser;
  }

  // Investigando me di cuenta que es mala practica? el tener que crear nuevamente una lista sin añadir lo que que se supone voy a eliminar, pues al hacer esto
  // se puede volver un poco tedioso y delicado si contamos con informacion importante.
  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   this.users = this.users.filter((user) => user.id !== id);
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
}
