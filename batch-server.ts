import 'reflect-metadata';
import { firebaseConfig } from "./src/environments/firebase.config";
import { initializeApp, auth, database } from 'firebase';
var Queue = require('firebase-queue');


console.log('Running batch server ...');

initializeApp(firebaseConfig);

auth()
  .signInWithEmailAndPassword('gerardo.leal@descostudio.com', '123456')
  .then(() => runConsumer())
  .catch(onError)

function onError(err) {
  console.error("Could not login: ", err);
  process.exit();
}

function runConsumer() {
  console.log("Running Consumer...");

  const lessonsRef = database().ref('lessons');
  const lessonsPerCourseRef = database().ref('lessonsPerCourse');
  const queueRef = database().ref("queue");

  const queue = new Queue(queueRef, function (data, progress, resolve, reject) {

    console.log("Data: ", data);

    lessonsRef.child(data.lessonId).remove()
      .then(() => {
        return lessonsPerCourseRef.child(`${data.courseId}/${data.lessonId}`).remove();
      })
      .then(() => {
        console.log("Lesson Deleted");
        resolve();
        process.exit();
      })
      .catch(err => {
        console.log("Lesson deletion failed, ", err);
        reject();
        process.exit();
      })
  })
}
