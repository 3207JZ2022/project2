import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SecurityComponent } from './user/security/security.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { MenuComponent } from './menu/menu.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardsSliderComponent } from './shared/cards-slider/cards-slider.component';
import { CardComponent } from './shared/cards-slider/card/card.component';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './shared/player/player.component';
import { VideoComponent } from './video/video.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { TimeFormatPipe } from './shared/player/TimeFormatPipe';
import { PageControlComponent } from './shared/page-control/page-control.component';
import { VideoDetailComponent } from './search/video-detail/video-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfileComponent,
    SecurityComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    SearchBarComponent,
    MenuComponent,
    CarouselComponent,
    CardsSliderComponent,
    CardComponent,
    SearchComponent,
    PlayerComponent,
    VideoComponent,
    HomeComponent,
    TimeFormatPipe,
    PageControlComponent,
    VideoDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
