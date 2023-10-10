import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './module/core/auth.module';
import { MongooseModule } from './module/config/mongoose.module';

@Module({
  imports: [
    MongooseModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}