import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UnitsController } from 'src/units/units.controller';
import { UnitsService } from 'src/units/units.service';
import { PostsModule } from './posts/posts.module';
import { ClassController } from './class/class.controller';
import { ClassService } from './class/class.service';
import { ClassModule } from './class/class.module';
import { StudentsModule } from './students/students.module';
import { TeacherController } from './teacher/teacher.controller';
import { TeacherService } from './teacher/teacher.service';
import { TeacherModule } from './teacher/teacher.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { GeneralInfomationsModule } from './general_infomations/general_infomations.module';
import { IndustrysModule } from './industrys/industrys.module';
import { IndustrysService } from './industrys/industrys.service';
import { MajorsModule } from './majors/majors.module';
import { MasterTrainingController } from './master_training/master_training.controller';
import { MasterTrainingService } from './master_training/master_training.service';
import { MasterTrainingModule } from './master_training/master_training.module';
import { GuestNotificationsModule } from './guest_notifications/guest_notifications.module';
import { ContinuingEducationController } from './continuing_education/continuing_education.controller';
import { ContinuingEducationService } from './continuing_education/continuing_education.service';
import { ContinuingEducationModule } from './continuing_education/continuing_education.module';
import { TuitionController } from './tuition/tuition.controller';
import { TuitionService } from './tuition/tuition.service';
import { TuitionModule } from './tuition/tuition.module';
import { MessageNodeController } from './message_node/message_node.controller';
import { MessageNodeModule } from './message_node/message_node.module';
import { MessageNodeService } from 'src/message_node/message_node.service';

@Module({
  imports: [
    PostsModule,
    ClassModule,
    StudentsModule,
    TeacherModule,
    AdminModule,
    GeneralInfomationsModule,
    IndustrysModule,
    MajorsModule,
    MasterTrainingModule,
    GuestNotificationsModule,
    ContinuingEducationModule,
    TuitionModule,
    MessageNodeModule,
  ],
  controllers: [
    UnitsController,
    ClassController,
    TeacherController,
    AdminController,
    MasterTrainingController,
    ContinuingEducationController,
    TuitionController,
    MessageNodeController,
  ],
  providers: [
    UnitsService,
    ClassService,
    TeacherService,
    AdminService,
    IndustrysService,
    MasterTrainingService,
    ContinuingEducationService,
    TuitionService,
    MessageNodeService,
  ],
})
export class AppModule {}
