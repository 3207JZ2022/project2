import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/Video.model';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent {
  @Input() video:Video;

  constructor(
    private router: Router,
    private route: ActivatedRoute
){}

  ngOnInit(){}


  ngOnDestroy(){

  }

  navToVideo(){
    this.router.navigate(['/video'],
    {queryParams: {videoId:this.video.id, ep: 0}})
  }
}
