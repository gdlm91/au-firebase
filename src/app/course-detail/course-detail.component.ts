import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  courseUrl: string;
  lessons: Lesson[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) { }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];

    this.course$ = this.courseService.findCourseByUrl(this.courseUrl);

    const lessons$ = this.courseService.loadingFirstLessonsPage(this.courseUrl, 3);

    lessons$.subscribe(lessons => this.lessons = lessons);
  }

  next() {
    this.courseService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      3
    )
      .subscribe(lessons => this.lessons = lessons);
  }

  prev() {
    this.courseService.loadPrevPage(
      this.courseUrl,
      this.lessons[0].$key,
      3
    )
      .subscribe(lessons => this.lessons = lessons);
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }

}
