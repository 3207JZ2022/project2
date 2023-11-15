import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  email: string;
  password: string;
  private storeSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  error: string|null = null;
  
  constructor(private router: Router, 
              private route: ActivatedRoute,
              // private store: Store<fromApp.AppState>,
              private http: HttpClient
  ){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required ])
    });

    // this.storeSub = this.store.select('auth').subscribe(authState => {
    //   this.isLoading = authState.loading;
    //   this.error = authState.authError;
    //   if (this.error) {
    //     // this.showErrorAlert(this.error);
    //     console.log('login error', this.error);
    //   }
    // });
  }
  
  ngOnDestroy() {
    // this.storeSub.unsubscribe();
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading=true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    // this.store.dispatch(
    //   AuthActions.loginStart({ email: email, password: password })
    // );

    this.http
    .post(
        environment.baseUrl +
        environment.testSignIn,
        
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        email: email,
        password: password
      }
    ).subscribe({
      next: (res)=>{
        console.log(res);
        this.isLoading=false;
      },
      error: (err)=>{
        console.log(err);
        this.isLoading=false;

      }
    })

    this.loginForm.reset();
  }

  onHandleError() {
    this.error = null;
  }


  navToSignUp(){
    this.router.navigate(['/signup']);
  }



}
