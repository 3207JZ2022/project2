import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Video } from "../models/Video.model";
import { environment } from "src/environments/environment";
// export interface Filter{
//     freeShipping:boolean,
//     onSale:boolean,
//     internationalShipping:boolean,
//     inStock:boolean
// }
@Injectable({
    providedIn: 'root'
})
export class SearchService{
    
    // videos: Video[] =[
    //     new Video("first img tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1", "tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1tddvxcvxcvxcest1", 126, "/assets/test/1.png", "1", ["adventure"]),
    //     new Video("sec img", "test2",26, "/assets/test/2.png", "2", ["bdventure"]),
    //     new Video("third img", "testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3testasdasdasdasdasdasdasdasd3", 726, "/assets/test/3.jpg", "3", ["cdventure", "asdasd"]),
    //     new Video("first img", "test1", 126, "/assets/test/1.png", "1", ["adventure"]),
    //     new Video("sec img", "test2",26, "/assets/test/2.png", "2", ["bdventure"]),
    //     new Video("third img", "test3", 726, "/assets/test/3.jpg", "3", ["cdventure", "asdasd"])
    // ]
    videoChanged = new EventEmitter<Video[]>();

    constructor(private http: HttpClient){
    }

    returnTest(){
        // this.videoChanged.emit(this.videos.slice())
        this.videoChanged.emit([])
    }

    returnSearchTest(query:string){
        // this.videoChanged.emit(this.videos.filter((vid:Video)=>{
        //     return vid.name.indexOf(query)>-1;
        // }))
  }


    getSearchResult(query:string){
        let url = environment.baseUrl+environment.baseSearchPath+"?searchQuery="+query
        // +'?orderBy="name"&startAt="'+query+'"&endAt="'+query+'\uf8ff"'
        // Firebase Realtime Database does not have queries for substrings. 
        // we obtain the data to local first
        this.http
          .get( url,
            {
              observe: 'response',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:8080'
                },
            },
          )
          .subscribe(
            response => {
              let temp:Video[]=[];
            //   console.log(response);
              let responseData=response.body;

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
              this.videoChanged.emit(temp);
            },
            error => {
              console.log(error.message);
            }
          );
      }


    
    // getSearchResultFilter(filter:Filter){

    // }
}