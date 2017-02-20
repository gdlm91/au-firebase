import { LessonsService } from './../shared/model/lessons.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  courseId: string;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];
  }

  save(form) {
    this.lessonService.createNewLesson(this.courseId, form.value)
      .subscribe(
        () => {
          alert("Lesson created successfully. Create another lesson?");
          form.reset();
        },
        err => alert(`Error creating Lesson, ${err}`)
      )
  }

}
