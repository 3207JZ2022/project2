import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Video } from 'src/app/models/Video.model';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import { faPlay, faPause, faExpand, faVolumeHigh, faVolumeMute, faCompress } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { videoService } from 'src/app/video/video.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  faplayCircle=faPlayCircle;
  faPlay=faPlay;
  faPause=faPause;
  faExpand=faExpand;
  faVolumeHigh=faVolumeHigh;
  faVolumeMute=faVolumeMute;
  faCompress=faCompress;
  @Input() playerWidth:number =540;
  @Input() playerHeight:number = 1420;
  // @Input() videoInput:string|null;
  videoInput:string="asd";

  videoSubscription: Subscription;
  @Input() episodes:number=1;
  videoId:number;
  ep:number;
  @Input() videoTitle:string="No Title";
  @Input() videoDescription:string="No Description"
  @Input() tags:string[]=[];

  @ViewChild("videoRef") videoRef: ElementRef;
  @ViewChild("volumeRef") volumeRef: ElementRef;
  @ViewChild("progressRef") progressRef: ElementRef;
  @ViewChild("playerRef") playerRef: ElementRef;

  fullscreenDisplayStyle={}
  fullscreenControllerStyle={}
  isMouseMove=false;
  isPlaying=false;
  isMute=false;
  isFullscreen=false;
  isDragged=false;

  currentVolume:number=0;
  previousVolume:number=0;

  currentTime:number=0;
  videoDuration:number=0;

  getDurationTimer:any;
  progressBarTracker:any;
  mouseMoveTimeout:any;

  styleTimer:any;


  prevHeight=0;
  prevWidth=0;

  boxStyle={
    boarderRadius: "5px",
    backgroundColor: "#d46c6f",
    color: "white",

  }

  boxAlign={
    justifyContent: "normal",
    flexWrap: "wrap"
  }
  


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private videoService: videoService
  ){}


  ngOnInit(){
    this.videoId=this.route.snapshot.queryParams['videoId']
    this.ep=this.route.snapshot.queryParams['ep']
    this.videoInput=this.videoService.currentVideoSource;
    this.getDurationTimer=setInterval(()=>{
      if(!Number.isNaN(this.videoRef.nativeElement.duration)&&this.videoRef.nativeElement.declarations!=0){
        this.videoDuration=Math.floor(this.videoRef.nativeElement.duration);
        clearInterval(this.getDurationTimer);
      }
    },500)
    
    this.progressBarTracker=setInterval(()=>{
      if(this.videoRef.nativeElement.pause||this.videoRef.nativeElement.ended) this.currentTime=this.videoRef.nativeElement.currentTime;
    },500)


    // this.styleTimer=setInterval(()=>{
      
    //   if(window.innerHeight!=this.prevHeight||window.innerWidth!=this.prevWidth){
    //     this.resize();

    //   }
    //   this.prevHeight=window.innerHeight;
    //   this.prevWidth=window.innerWidth;
    // },400)


  }

  ngAfterViewInit(){
    this.videoSubscription=this.videoService.currentVideoSourceChange.subscribe(source=>{

      this.videoInput=this.videoService.currentVideoSource;
      this.videoRef.nativeElement.load();
    })

    this.volumeRef.nativeElement.addEventListener("change",()=>{
    this.videoRef.nativeElement.volume=this.volumeRef.nativeElement.value;
      if(this.videoRef.nativeElement.volume===0){
        this.isMute=true;
      }else{
        this.isMute=false;
      }
    })

    // document.addEventListener('webkitfullscreenchange', ()=>{
    //   if(this.isFullscreen) this.toggleFullscreen();
    // });
    // document.addEventListener('mozfullscreenchange', this.toggleFullscreen, false);
    document.addEventListener('fullscreenchange', ()=>{
      if(!document.fullscreenElement){
        setTimeout(()=>{
          if(this.isFullscreen){
            this.isFullscreen=!this.isFullscreen;
            this.fullscreenDisplayStyle={}
            this.fullscreenControllerStyle={}
          }
        },100)
      }
    });
    // document.addEventListener('MSFullscreenChange', this.toggleFullscreen, false);
    this.progressRef.nativeElement.addEventListener('mousedown', (e:any) =>{
        this.isDragged=true;
        clearInterval(this.progressBarTracker);
        this.videoRef.nativeElement.pause();
    })
    window.addEventListener('mouseup', () =>{
        if(this.isDragged){
          this.progressBarTracker=setInterval(()=>{
            if(this.videoRef.nativeElement.pause||this.videoRef.nativeElement.ended) this.currentTime=this.videoRef.nativeElement.currentTime;
          },500)
          this.videoRef.nativeElement.currentTime = this.progressRef.nativeElement.value;
          if(this.isPlaying) this.videoRef.nativeElement.play();
        }
        this.isDragged=false;
    })

    this.styleTimer=setInterval(()=>{
      this.resize();
    },400)


    this.playerRef.nativeElement.addEventListener("mousemove", ()=>{
      if(this.mouseMoveTimeout){
        clearTimeout(this.mouseMoveTimeout)
      }
      this.isMouseMove=true;
      this.mouseMoveTimeout=setTimeout(() => {
        this.isMouseMove=false;
      }, 2000);
    })
  } 
  ngOnDestroy(){
    clearInterval(this.progressBarTracker);
    clearInterval(this.styleTimer)
    this.videoSubscription.unsubscribe();
  }

  togglePlay(){
    this.isPlaying=!this.isPlaying;
    if(this.isPlaying){
      this.videoRef.nativeElement.play();
    }else{
      this.videoRef.nativeElement.pause();
    }
  }

  toggleMute(){
    this.isMute=!this.isMute;
    if(this.isMute){
      this.previousVolume=this.volumeRef.nativeElement.value;
      this.videoRef.nativeElement.volume=0;
      this.volumeRef.nativeElement.value=0;
    }else{
      this.videoRef.nativeElement.volume=this.previousVolume;
      this.volumeRef.nativeElement.value=(this.previousVolume);

    }
  }

  toggleFullscreen(){
    this.isFullscreen=!this.isFullscreen;
    if(this.isFullscreen){
      if(document.documentElement.requestFullscreen){
        document.documentElement.requestFullscreen();
      }
      this.fullscreenDisplayStyle={
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: "0px",
        left: "0px",
        zIndex: "9"
      }
      this.fullscreenControllerStyle={
        position: "fixed",
        bottom: "0vh",
        zIndex: "10"
      }
    }else{
      if(document.fullscreenElement){
        document.exitFullscreen();
      }
      this.fullscreenDisplayStyle={}
      this.fullscreenControllerStyle={}
    }
  }

  resize(){
    this.playerWidth=Math.min(1500, (window.innerWidth*0.9));
    this.playerHeight=Math.max(this.playerWidth/2.213, window.innerHeight*0.9);

  }

  toPage(index:number){
    this.router.navigate(['/video'],
    {queryParams: {
                  videoId:this.route.snapshot.queryParams['videoId'],
                  ep:index
    }})
  }
}
