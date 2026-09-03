import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtAuthMiddleware } from 'src/auth/jwt-auth.middleware';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes(HabitsController);
  }
}
