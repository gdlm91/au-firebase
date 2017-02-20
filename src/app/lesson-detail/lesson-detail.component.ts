import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    this.route.params.switchMap(params => {
      const lessonUrl = params['id'];

      return this.lessonService.findLessonByUrl(lessonUrl)
    })
    .subscribe(lesson => this.lesson = lesson);
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
    console.log(lesson);
    this.router.navigate(['lessons', lesson.url]);
  }

}
