import { Component } from '@angular/core';
import { Video } from '../models/Video.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  test="http://localhost:8080/videoStream";
  test1="http://localhost:8080/sample";

  carouselSub: Subscription;

        carousel:Video[]=[];
        cards:Video[]=[
          // new Video("first img", "test1", 126, "/assets/test/1.png", "1", ["adventure"]),
          // new Video("sec img", "test2",26, "/assets/test/2.png", "2", ["bdventure"]),
          // new Video("third img", "test3", 726, "/assets/test/3.jpg", "3", ["cdventure", "asdasd"]),
          // new Video("first img", "test1", 126, "/assets/test/1.png", "1", ["adventure"]),
          // new Video("sec img", "test2",26, "/assets/test/2.png", "2", ["bdventure"]),
          // new Video("third img", "test3", 726, "/assets/test/3.jpg", "3", ["cdventure", "asdasd"]),
        ];
      
        constructor(private router: Router,
                    private route: ActivatedRoute,
                    private homeService: HomeService){}
        ngOnInit(){
          // fetch video for the carousel and slider
          this.carouselSub = this.homeService.videoChanged.subscribe(videos=>{
            this.carousel=videos;
          })
          this.homeService.loadUpHomeCarousel();
        }

        ngOnDestroy(){
          this.carouselSub.unsubscribe();
        }

        navToVideo(id:string){
          this.router.navigate(['/video'],
          {queryParams: {videoId:id, ep: 0}})
        }
}
