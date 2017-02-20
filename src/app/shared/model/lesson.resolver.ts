import { LessonsService } from './lessons.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from './lesson';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LessonResolver implements Resolve<Lesson> {

  constructor(private lessonService: LessonsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson> {
    return this.lessonService
      .findLessonByUrl(route.params['id'])
      .first();
  }

}
