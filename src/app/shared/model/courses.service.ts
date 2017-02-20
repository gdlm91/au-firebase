import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';
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

  findLessonKeysPerCourseUrl(courseUrl: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .switchMap(course => this.afDB.list('lessonsPerCourse/' + course.$key, query))
      .map(lspc => lspc.map(lpc => lpc.$key));
  }

  findLessonsForLessonKeys(lessonsKeys$: Observable<string[]>): Observable<Lesson[]> {
    return lessonsKeys$
      .map(lspc => lspc.map(lessonKey => this.afDB.object('lessons/' + lessonKey)))
      .flatMap(fbobjs => Observable.combineLatest(fbobjs));
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(this.findLessonKeysPerCourseUrl(courseUrl));
  }

  loadingFirstLessonsPage(courseUrl: string, pageSize: number): Observable<Lesson[]> {
    const fistPageLessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        limitToFirst: pageSize
      }
    });

    return this.findLessonsForLessonKeys(fistPageLessonKeys$);
  }

  loadNextPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: pageSize + 1
      }
    });

    return this.findLessonsForLessonKeys(lessonKeys$)
      .map(lessons => lessons.slice(1, lessons.length));
  }

  loadPrevPage(courseUrl: string, lessonKey: string, pageSize: number): Observable<Lesson[]> {
    const lessonKeys$ = this.findLessonKeysPerCourseUrl(courseUrl, {
      query: {
        orderByKey: true,
        endAt: lessonKey,
        limitToLast: pageSize + 1
      }
    });

    return this.findLessonsForLessonKeys(lessonKeys$)
      .map(lessons => lessons.slice(0, lessons.length - 1));
  }

}
