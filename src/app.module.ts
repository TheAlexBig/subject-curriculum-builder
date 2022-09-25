import { Module } from '@nestjs/common';
import { ServiceConfig } from './configuration/app.configuration';
import { CurriculumModule } from './curriculum/curriculum.module';
import { SubjectModule } from './subject/subject.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServiceConfig,
    SubjectModule,
    CurriculumModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
