import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { VideoComponent} from './video/video.component'
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/home', pathMatch:"full"
  },
  {
    path:'home', 
    component: HomeComponent
  },

  {
    path:'signin',
    component: SignInComponent
  },
  {
    path:"signup",
    component: SignUpComponent
  },
  // {
  //   path:'account',
  //   loadChildren:()=> import('./account/user.module').then(m=>m.UserModule)
  // },
  // {
  //   path:'support',
  //   component: SupportComponent
  // },
  {
    path:'search',
    component: SearchComponent
  },
  {
    path:'video',
    component: VideoComponent
  },
  {
    path:'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, 
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
