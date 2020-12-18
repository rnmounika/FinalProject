import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  notValid=false;
  // loggedIn = false;


  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService) {

   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }
  onSubmit() {
    console.log("submit")
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.dataService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
           data => {
              console.log(data);
                // get return url from query parameters or default to home page
                // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                // this.router.navigateByUrl(returnUrl);
                if(data.success)
                {
                  this.dataService.setLoggedIn()
                  const token = data.token;
                  localStorage.setItem('jwt111',token);
                  const refreshToken = data.refreshToken;
                  localStorage.setItem('refreshToken',refreshToken);
                  console.log(this.f.username.value)
                  this.router.navigate(['/dashboard',this.f.username.value]);
                }
                else
                {
                  this.notValid=true;
                  // this.router.navigate(['/p404']);
                  return;

                }
                if(data.message == "Not Valid")
                {
                  this.notValid=true;
                  // this.router.navigate(['/p404']);
                  return;
                }

                // System.out.println("<script>alert('Login fail.')</script>");
            },
             error => {
                // this.alertService.error(error);
                // this.loading = false;
                this.notValid=true;
                  // this.router.navigate(['/p404']);
                  return;
            }
        );




}
}
