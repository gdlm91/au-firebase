import { Router } from '@angular/router';
import { AuthService } from './../shared/security/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    })
  }

  isPasswordMatch() {
    const formVal = this.form.value;

    return formVal && formVal.password && formVal.password == formVal.confirm;
  }

  register() {
    const formVal = this.form.value;

    this.authService.register(formVal.email, formVal.password)
      .subscribe(
        () => {
          alert('User registered successfully!');
          this.router.navigateByUrl('/home');
        },
        err => alert(err)
      );
  }
}
