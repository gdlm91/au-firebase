import { LessonsService } from './../shared/model/lessons.service';
import { Lesson } from './../shared/model/lesson';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) {

    route.data
      .subscribe(
      data => this.lesson = data['lesson']
      )

  }

  ngOnInit() {
  }

  save(lesson) {
    this.lessonService.saveLesson(this.lesson.$key, lesson)
      .subscribe(
        () => {
          alert('Lesson saved successfully');
        },
        err => alert('Error saving lesson ${err}')
      )
  }

}
