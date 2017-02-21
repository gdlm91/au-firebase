import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonsService } from './../shared/model/lessons.service';
import { Lesson } from './../shared/model/lesson';
import * as _ from 'lodash';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  lesson: Lesson;
  params$: Observable<any>;
  paramsSubs: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    this.params$ = this.route.params.switchMap(params => {
      const lessonUrl = params['id'];

      return this.lessonService.findLessonByUrl(lessonUrl)
    });

    this.paramsSubs = this.params$.subscribe(lesson => this.lesson = lesson);
  }

  next() {
    this.lessonService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  prev() {
    this.lessonService.loadPrevLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

  delete() {
    const courseId = this.lesson.courseId;

    this.paramsSubs.unsubscribe();

    this.lessonService.deleteLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(
        () => this.router.navigate(['courses']),
        err => {
          console.error(err);
          this.paramsSubs = this.params$.subscribe(lesson => this.lesson = lesson);
        }
      );
  }

}
