import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire } from 'angularfire2';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {

  constructor(private af: AngularFire) { }

  findAllLessons(): Observable<Lesson[]> {
    return this.af.database.list('lessons')
      .map(Lesson.fromJsonList)
      .do(console.log);
  }

  findLessonByUrl(url: string): Observable<Lesson> {
    return this.af.database.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: url
      }
    })
      .map(results => Lesson.fromJson(results[0]));
  }

  loadNextLesson(courseId, lessonKey): Observable<Lesson> {
    return this.af.database.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: lessonKey,
        limitToFirst: 2
      }
    })
      .map(results => results[1].$key)
      .switchMap(lessonKey => this.af.database.object(`lessons/${lessonKey}`))
      .map(Lesson.fromJson);
  }

  loadPrevLesson(courseId, lessonKey): Observable<Lesson> {
    return this.af.database.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonKey,
        limitToLast: 2
      }
    })
      .map(results => results[0].$key)
      .switchMap(lessonKey => this.af.database.object(`lessons/${lessonKey}`))
      .map(Lesson.fromJson);
  }

}
