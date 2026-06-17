import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { EmailService } from './email.service';

@Global()
@Module({
  providers: [RedisService, EmailService],
  exports: [RedisService, EmailService],
})
export class SharedModule {}
