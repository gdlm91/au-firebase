import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs';
import { Course } from './course';
import { Lesson } from './lesson';

@Injectable()
export class CoursesService {

  constructor(
    private afDB: AngularFireDatabase
  ) { }

  findAllCourses(): Observable<Course[]> {
    return this.afDB.list('courses').map(Course.fromJsonList);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.afDB.list('courses', {
      query: {
        orderByChild: 'url',
        equalTo: courseUrl
      }
    })
      .map(results => results[0]);
  }

  findLessonKeysPerCourseUrl(courseUrl: string): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .switchMap(course => this.afDB.list('lessonsPerCourse/' + course.$key))
      .map(lspc => lspc.map(lpc => lpc.$key));
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.findLessonKeysPerCourseUrl(courseUrl)
      .map(lspc => lspc.map(lessonKey => this.afDB.object('lessons/' + lessonKey)))
      .flatMap(fbobjs => Observable.combineLatest(fbobjs));
  }

}
