import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from './../shared/model/lesson';
import { Course } from './../shared/model/course';
import { CoursesService } from './../shared/model/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) { }

  ngOnInit() {
    const courseUrl = this.route.snapshot.params['id'];

    this.course$ = this.courseService.findCourseByUrl(courseUrl);

    this.lessons$ = this.courseService.findLessonsForCourse(courseUrl);
  }

}
