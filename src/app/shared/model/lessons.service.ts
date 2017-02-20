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

}
