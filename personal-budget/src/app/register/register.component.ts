import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  existingEmail = false;

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
          firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
    },{
      validator: this.MustMatch('password', 'confirmPassword')
    });
    }

    MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];

          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }

          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

    get f() { return this.form.controls; }

    onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      // this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.dataService.register(this.form.value)
          .pipe(first())
          .subscribe(
             data => {
                console.log(data.success);
                  // get return url from query parameters or default to home page
                  // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  // this.router.navigateByUrl(returnUrl);
                  if(data.success)
                  this.router.navigate(['/success']);
                  else
                  {
                    console.log(data.err.code)
                    if(data.err.code==11000)
                    {
                      this.existingEmail=true
                      return;
                    }

                  }


                  // this.router.navigate(['/p404']);
                  // System.out.println("<script>alert('Login fail.')</script>");
              },
               error => {
                  // this.alertService.error(error);
                  console.log("Registration failed")
                  this.loading = false;
              }
          );




  }

}
