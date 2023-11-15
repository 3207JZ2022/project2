import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import * as fromApp from '../../store/app.reducer'
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import * as AuthActions from '../store/auth.actions'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  private storeSub: Subscription;
  isLoading = false;
  error: string|null = null;

  constructor(private router: Router, 
    private route: ActivatedRoute,
    // private store: Store<fromApp.AppState>
    private http: HttpClient
  ){}


  ngOnInit() {
    this.signupForm = new FormGroup({
        'firstName': new FormControl(null, [Validators.required ]),
        'lastName':new FormControl(null, [Validators.required ]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required]),
        'confirmPassword': new FormControl(null, [Validators.required, this.passwordMismatch.bind(this)])
      })

      // this.storeSub = this.store.select('auth').subscribe(authState => {
      //   this.isLoading = authState.loading;
      //   this.error = authState.authError;
      //   if (this.error) {
      //     console.log('login error', this.error);
      //   }
      // });
  }

  ngDestroy(){
    // this.storeSub.unsubscribe();
  }

  navToLogin(){
    this.router.navigate(['/signin']);
  }

  passwordMismatch(control: FormControl): {[s: string]: boolean} |null {
    if(!control.value){
      return null;
    }

    if (control.value.password!=control.value.confirmPassword) {
      return {'passwordMismatched': true};
    }
    return null;
  }



  onSubmit(){
    if (!this.signupForm.valid) {
      return;
    }

    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const firstName = this.signupForm.value.firstName;
    const lastName = this.signupForm.value.lastName;
    this.isLoading=true;
    
    // this.store.dispatch(
    //   AuthActions.signupStart({ email: email, password: password, firstName: firstName, lastName: lastName})
    // );

    this.http
    .post(
        environment.baseUrl +
        environment.testSignUp,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
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


    this.signupForm.reset();
  }
}
