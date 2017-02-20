import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from './../shared/model/lessons.service';
import { Lesson } from './../shared/model/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  lesson: Lesson;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    const lessonUrl = this.route.snapshot.params['id'];

    this.lessonService.findLessonByUrl(lessonUrl)
      .do(console.log)
      .subscribe(lesson => this.lesson = lesson)
  }

}
