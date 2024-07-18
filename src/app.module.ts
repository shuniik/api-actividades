import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      // synchronize:true,
      options: {
        encrypt: false, // Disable SSL/TLS
      },
    }),
    EmpresaModule,
 
  
    
  ],

})
export class AppModule {
}
  // console.log(process.env.DB_HOST);
  // console.log(process.env.DB_PORT);
  // console.log(process.env.DB_NAME);
  // console.log(process.env.DB_USER_NAME);
  // console.log(process.env.DB_PASSWORD);
