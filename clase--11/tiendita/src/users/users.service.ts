import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity"; 

@Injectable()
export class UsersService {
  users:Array<User>;

  constructor() {
    this.users = [];
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.generateUniqueId(), 
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      email: createUserDto.email,
      password: createUserDto.password,
      avatar: ""
    }
    this.users.push(newUser);
    return newUser; 
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000); 
  }
}
