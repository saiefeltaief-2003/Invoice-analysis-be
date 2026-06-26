import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/SummerIntern2026'),
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
