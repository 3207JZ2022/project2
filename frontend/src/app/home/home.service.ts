import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Video } from "../models/Video.model";
import {environment} from "src/environments/environment"

@Injectable({
    providedIn: 'root'
})

export class HomeService{
    // playerLayoutChanged = new EventEmitter<{}>();
    // recommendListlayoutChanged = new EventEmitter<{}>();
    videos: Video[];
    videoChanged = new EventEmitter<Video[]>();

    constructor(private http:HttpClient){}
    


    loadUpHomeCarousel(){
        let url = environment.baseUrl + environment.home

        this.http.get(url,{
            observe: 'response'
        }).subscribe({
            next: (res) => {
                let temp: Video[]=[];
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
                    }[];
                    t.forEach((vid)=>{
                        temp.push(
                            new Video(vid.title, vid.descrip, environment.baseUrl+environment.imgPath+vid.imgSrc, vid.videoID, vid.tag.split(" ") , vid.releaseDate, vid.views, vid.episodes)
                        );
                    })
                
                }

                
                this.videos=temp;
                this.videoChanged.emit(this.videos.slice());

            },
            error: (e) => console.error(e),
            // complete: () => console.info('complete')
        })
    }


    
}
