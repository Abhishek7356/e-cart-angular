import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login = () => {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      console.log(email, password)

      const user = { email, password }

      this.api.login(user).subscribe({
        next: (res: any) => {
          console.log(res)
          sessionStorage.setItem("token", JSON.stringify(res.token))
          sessionStorage.setItem("user", JSON.stringify(res.user))
          alert("Login Successfull")
          this.router.navigateByUrl('/')
        },
        error: (err: any) => {
          console.log(err)
          if (err.status == 501) {
            alert("Email not found, please register")
          } else if (err.status == 502) {
            alert("Wrong password")
          } else {
            alert("Something went wrong, cant login")
          }
        }
      })

    } else {
      alert("Invalid Form")
    }
  }
}
