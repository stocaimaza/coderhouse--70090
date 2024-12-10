import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//Nos conectamos a la Base de Datos: 
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

//MiMiddleware: 
import MiMiddleware from './middleware/miMiddleware';

//Variables de entorno:
//npm install  @nestjs/config
//Importamos ConfigModule, ConfigService: 
import { ConfigModule, ConfigService } from '@nestjs/config';

//Modificamos los imports: 

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(config: ConfigService) => ({
      uri: config.get<string>("MONGO_URL")
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL})
  }
}

//MongooseModule.forRoot("mongodb+srv://swtocaimaza:coderhouse@cluster0.pmzgicx.mongodb.net/Auditoria?retryWrites=true&w=majority&appName=Cluster0")
