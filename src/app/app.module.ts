import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { firebaseConfig, authConfig } from '../environments/firebase.config';
import { routerConfig } from './router.config';

import { LessonsService } from './shared/model/lessons.service';
import { CoursesService } from './shared/model/courses.service';
import { LessonResolver } from './shared/model/lesson.resolver';

import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent,
    EditLessonComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routerConfig),
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    ReactiveFormsModule
  ],
  providers: [LessonsService, CoursesService, LessonResolver, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
