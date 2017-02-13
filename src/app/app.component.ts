import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular University - Firebase!';
  courses$: FirebaseListObservable<any[]>;
  lesson$: FirebaseObjectObservable<any>;
  lastCourse: any;

  constructor(private af: AngularFire) { }

  ngOnInit() {
    this.courses$ = this.af.database.list('courses');
    this.courses$.subscribe(console.log);
    this.courses$.map(courses => courses[courses.length - 1])
      .subscribe(course => this.lastCourse = course)

    this.lesson$ = this.af.database.object('lessons/-Kct1RSeJYXSUR7gHSV8');
    this.lesson$.subscribe(console.log);
  }

  listPush() {
    this.courses$.push({ description: "TEST New Course" })
      .then(() => console.log("List Push done"))
      .catch(console.error);
  }

  listRemove() {
    this.courses$.remove(this.lastCourse);
  }

  listUpdate() {
    this.courses$.update(this.lastCourse, {
      description: 'Angular Course Modified!'
    })
  }

  objUpdate() {
    this.lesson$.update({
      description: "This is a New Description"
    });
  }

  objSet() {
    this.lesson$.set({
      description: "This is a New Description"
    });
  }

  objRemove() {
    this.lesson$.remove()
      .then(() => console.log("Object Removed"))
      .catch(console.error);
  }

}
