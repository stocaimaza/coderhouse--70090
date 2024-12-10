import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//Necesitamos importar nuevas herramientas: 

//1) Importamos el decorador @InjectModel
import { InjectModel } from '@nestjs/mongoose';
//2) Importamos el model de mongoose
import { Model } from "mongoose"; 
//3) Importamos el User y el UserSchema: 
import { User, userSchema, UsersDocument} from "./schema/users.schema";

@Injectable()
export class UsersService {
  //Creamos el constructor, hacemos la inyeccion del nombre del modelo de usuario: 
  constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto); 
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
