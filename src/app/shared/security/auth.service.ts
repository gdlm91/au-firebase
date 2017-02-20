import { AuthInfo } from './auth-info';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/index';

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.subscribe(auth => {
      if(auth) {
        const authInfo = new AuthInfo(auth.uid);
        this.authInfo$.next(authInfo);
      } else {
        this.authInfo$.next(AuthService.UNKNOWN_USER);
      }
    })
  }

  login(email: string, password: string): Observable<any> {
    return this.fromAfAuthPromise(this.afAuth.login({email, password}));
  }

  register(email: string, password: string): Observable<any> {
    return this.fromAfAuthPromise(this.afAuth.createUser({email, password}));
  }

  fromAfAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(
        res => {
          subject.next(res);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
      )

      return subject.asObservable();

  }

  logout() {
    this.afAuth.logout();
  }

}
