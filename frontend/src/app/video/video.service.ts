import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Video } from "../models/Video.model";
import {environment} from "src/environments/environment"
import { VideoSource } from "../models/VideoSource.model";

@Injectable({
    providedIn: 'root'
})

export class videoService{
    playerLayoutChanged = new EventEmitter<{}>();
    recommendListlayoutChanged = new EventEmitter<{}>();

    currentVideo:Video|null=null;
    currentVideoSource:string="";
    currentVideoChange= new EventEmitter<Video>();
    currentVideoSourceChange= new EventEmitter<string>();


    constructor(private http:HttpClient){}



    getVideo(videoId:string){
        let url = environment.baseUrl + environment.baseVideoPath + "?videoId="+videoId;
        if(videoId==this.currentVideo?.getId().toString()){return;}
        this.http.get(url,{
            observe: 'response'
        }).subscribe({
            next: (res) => {
                // console.log(res)
                let temp: Video;
                let responseData=res.body;
                if(responseData){
                    let t = responseData as {
                      title:string,
                      descrip:string,
                      imgSrc:string,
                      videoID: number,
                      tag:string,
                      releaseDate:string,
                      views: number,
                      episodes: number
                  };
                  temp= new Video(t.title, t.descrip, environment.baseUrl+environment.imgPath+t.imgSrc, t.videoID, t.tag.split(" ") , t.releaseDate, t.views, t.episodes)
                  this.currentVideo=temp;
                  this.currentVideoChange.emit(temp);
                  }
            },
            error: (e) => console.error(e),
            // complete: () => console.info('complete')
        })
    }
    getVideoSource(videoPath:string){
        this.currentVideoSource = environment.baseUrl + environment.videoSrc +videoPath;
        this.currentVideoSourceChange.emit(this.currentVideoSource);
    }

    playerLayoutChange(style:{}){
        this.playerLayoutChanged.emit(style);
    }
    recommendListlayoutChange(style:{}){
        this.recommendListlayoutChanged.emit(style);
    }
    
}
