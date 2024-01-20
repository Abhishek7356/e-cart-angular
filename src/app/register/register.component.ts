import { Component } from '@angular/core';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder, private api: ApiService,private router:Router) { }
  registerForm = this.fb.group({//group
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z .]*')]],//array
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register = () => {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      console.log(username, email, password)

      const user = { username, email, password }
      this.api.register(user).subscribe({
        next: (res:any) => {
          // console.log(res)
          alert("User registered successfull")
          this.router.navigateByUrl('user/login')
        },
        error: (err:any) => {
          console.log(err)
          alert(err.error)
        }
      })
    } else {
      alert("Invalid credentials")
    }

  }
}
