import { Component } from '@angular/core';
import { Video } from '../models/Video.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { videoService } from './video.service';
import { VideoSource } from '../models/VideoSource.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
    video: Video;
    videoId: string;
    episode: string;
    videoSource: string;


    routeSub: Subscription;
    videoSub: Subscription;
    videoSourceSub: Subscription;

    isFetching=false;
    playerWidth=1440
    playerHeight= 800
    previousWidth=-999
    previousHeight=-999

    isVertical=true;
    videoLayoutStyle={
      display: "flex"
    }

    cards:Video[]=[];
    timer:any;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private videoService: videoService){
      }


    ngOnInit(){
      this.videoId = this.route.snapshot.queryParams['videoId']
      
      this.videoSub= this.videoService.currentVideoChange.subscribe(video=>{
        this.video=video;
      })
      this.videoSourceSub = this.videoService.currentVideoSourceChange.subscribe(source=>{
        this.videoSource=source;
      })

      this.routeSub=this.route.queryParams.subscribe((params: Params)=>{
        this.videoId = this.route.snapshot.queryParams['videoId']
        this.episode = this.route.snapshot.queryParams['ep']
        // this.isFetching=true;
        this.videoService.getVideo(this.videoId);
        this.videoService.getVideoSource("?videoId="+this.videoId+"&episode="+this.episode);

      })
    }
    ngAfterViewInit() {
      this.timer = setInterval(() =>{
        // this.height=this.width=Math.min(window.innerWidth*0.9, 660); 
        this.playerWidth=window.innerWidth;
        this.playerHeight=window.innerHeight;
        // this.playerWidth=Math.min(1440, window.innerWidth);
        // this.playerHeight=Math.min(800, window.innerHeight);
        if(this.previousWidth!==this.playerWidth||this.previousHeight!==this.playerHeight){
          this.resize();
        };
        this.previousWidth=this.playerWidth;
        this.previousHeight=this.playerHeight;
      },500)
    }
    ngOnDestroy(){


    }

    resize(){
      this.playerWidth=Math.min(1440, window.innerWidth);
      this.playerHeight=Math.min(800, window.innerHeight);
      if(window.innerWidth< 1680) {
        this.videoLayoutStyle={
          display: "block"
        }
        this.isVertical=false;
      }else{
        this.videoLayoutStyle={
          display: "flex"
        }
        this.isVertical=true;
      }
      this.videoService.playerLayoutChange(this.videoLayoutStyle);
      // this.videoService.recommendListlayoutChange(this.)
    }
    navToVideo(id:string){
      this.router.navigate(['/video'],
      {queryParams: {videoId:id, ep: 0}})
    }
}
