import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Video } from '../models/Video.model';
import { Subscription } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    search: string;
    resultCount:number=0;
    searchSub: Subscription;
    routeSub: Subscription;
    isFetching: boolean=false;
    faBars=faBars

    expanded:boolean=false;

    videos:Video[];

    constructor(private router: Router,
                private route: ActivatedRoute,
                private searchService: SearchService
                ){}

    ngOnInit() {
        this.search = this.route.snapshot.queryParams['searchQuery']

        this.searchSub= this.searchService.videoChanged.subscribe(videos=>{
            this.isFetching=true;
            this.videos=videos;
            this.resultCount=this.videos.length;
            this.isFetching=false;
        })

        this.routeSub=this.route.queryParams.subscribe((params: Params)=>{
          this.search = this.route.snapshot.queryParams['searchQuery']
          this.isFetching=true;
          // this.searchService.returnSearchTest(this.search);

          this.searchService.getSearchResult(this.search);
          this.isFetching=false;

        })



    }

    ngOnDestroy() {
      // this.searchSub.unsubscribe();
      this.routeSub.unsubscribe();
    }



}
