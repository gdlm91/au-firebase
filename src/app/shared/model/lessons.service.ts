import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFire, FirebaseRef } from 'angularfire2';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {

  fbDB: any;

  constructor(private af: AngularFire, @Inject(FirebaseRef) fbRef) {
    this.fbDB = fbRef.database().ref();
  }

  findAllLessons(): Observable<Lesson[]> {
    return this.af.database.list('lessons')
      .map(Lesson.fromJsonList);
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

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const lessonToSave = Object.assign({}, lesson, { courseId });

    const newLessonKey = this.fbDB.child('lessons').push().key;

    let dataToSave = {}

    dataToSave[`lessons/${newLessonKey}`] = lessonToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;

    return this.firebaseUpdate(dataToSave);
  }

  saveLesson(lessonId: string, lesson: any): Observable<any> {
    const lessonToSave = Object.assign({}, lesson);
    delete (lessonToSave.$key);

    let dataToSave = {};
    dataToSave[`lessons/${lessonId}`] = lessonToSave;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave): Observable<any> {
    const subject = new Subject();

    this.fbDB.update(dataToSave)
      .then(
      val => {
        subject.next(val);
        subject.complete();
      },
      err => {
        subject.error(err);
        subject.complete();
      }
      );

    return subject.asObservable();
  }

  deleteLesson(courseId, lessonId): Observable<any> {
    const subject = new Subject();

    this.af.database.object(`lessons/${lessonId}`).remove()
      .then(() => {
        return this.af.database.object(`lessonsPerCourse/${courseId}/${lessonId}`).remove()
      })
      .then(() => {
        subject.next(true);
        subject.complete();
      })
      .catch(err => {
        subject.error(err);
        subject.complete();
      });

    return subject.asObservable();
  }

}
