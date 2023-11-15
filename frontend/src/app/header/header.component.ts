import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn:boolean = false;

  constructor(private router: Router){}

  ngOnInit(){

  }

  toSignIn(){
    if(this.loggedIn){
      // this.store.dispatch(AuthActions.logout());
      // this.router.navigate(['/']);
    }else{
      this.router.navigate(['/signin']);
    }
  }

  toHome(){
    this.router.navigate(['/home']);

  }
}
