import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.url!, {
      dbName: process.env.dbName!,
    }),
    UsersModule,
    InvoicesModule,
    SuppliersModule,
    RecommendationsModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
