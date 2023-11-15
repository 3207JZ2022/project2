import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-control',
  templateUrl: './page-control.component.html',
  styleUrls: ['./page-control.component.css']
})
export class PageControlComponent {
  // total 4 pages by default
  @Input() itemNumber:number =25;
  @Input() itemPerPage:number=10;
  @Input() maxPageAllowed:number = 4;
  @Input() arrowDisabled=false;
  @Input() enableBindFunction=false;
  @Input() bindFunction: (args: any) => void =((index)=>{});

  @Input() firstValue:number=0;

  pageTotal:number = 10;
  pageBtnArray=[0];

  @Input() pageBoxStyle={

  }

  currentSelectedIndex:number=0;
  previousSelectedIndex:number=0;
  indexDifference:number=0;
  indexPadding:number=0;

  @Input() justifyContent={
    justifyContent: "center"
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute
  ){}

  ngOnInit() {
      this.pageTotal= Math.ceil(this.itemNumber / this.itemPerPage)

      // if total possible pages is more than the maximum page allowed, we only render the later one
      if(this.pageTotal>this.maxPageAllowed){
        
        this.pageBtnArray=new Array(this.maxPageAllowed)
      }else{
        
      // if item per page is less than amount of item, we get multi buttons
      // else we only need 1 page button
        let pageBtnNeeded= this.itemPerPage<this.itemNumber? 
        Math.ceil(this.itemNumber / this.itemPerPage) : 1
        this.pageBtnArray=new Array(pageBtnNeeded)
      }


  }

  ngAfterViewInit(){
    this.setIndex(this.firstValue);
  }


  // reset the index to update button view
  setIndex(index:number){

    // update index difference to know current page number;
    this.previousSelectedIndex=this.currentSelectedIndex;
    this.currentSelectedIndex=index;
    let difference=this.currentSelectedIndex-this.previousSelectedIndex
    if(difference==0)return;
    // update index difference
    this.indexDifference+=difference;

    // if we click the first button, we may need to adjust the button view
    if(this.indexDifference==0){
      if(this.indexPadding>0){
        this.indexDifference++;
        this.currentSelectedIndex++;
        this.indexPadding--;
        return;
      }

    }
    // if we click the last button
    if(this.indexDifference==this.maxPageAllowed-1){

      // if we cannot see the last index, do a padding shift
      if(this.pageTotal> this.indexPadding + this.maxPageAllowed){
        this.indexDifference--;
        this.currentSelectedIndex--;
        this.indexPadding++;
        return;
      }

      // if we can see the last index, do an index shift
      // if(this.pageTotal < this.indexPadding + this.maxPageAllowed){
        // already done outside
      // }
    }

    if(this.enableBindFunction){
      this.bindFunction(this.indexPadding+this.indexDifference);
    }

  }


  prevIndex(){
    //first index, do nothing
    // console.log('indexDifference', this.indexDifference)

    if(this.indexPadding==0&&this.indexDifference==0)return;
    
    // will arrive first button, but cannot see the first button, do a shift
    if(this.indexDifference==1&&this.indexPadding ==0){
        this.indexDifference-=1
        this.currentSelectedIndex--;
        return;
    }

    if(this.indexDifference==1){
      this.indexPadding-=1;
      return;
    }
    this.indexDifference-=1
    this.currentSelectedIndex--;
  }



  nextIndex(){
    //at last index, do nothing
    if(this.indexDifference+this.indexPadding>=this.pageTotal-1) return;
    
    // if we can see the last index, do a index shift
    if(this.pageTotal<= this.indexPadding + this.maxPageAllowed){
        this.indexDifference+=1;
        this.currentSelectedIndex++;

        return;
    }

    // if we are next to the last button, do a padding shift
    if(this.indexDifference == this.maxPageAllowed-2&&this.indexPadding + this.maxPageAllowed<= this.pageTotal){
      this.indexPadding+=1;
      return;
    }

    // change selectedIndex
    this.indexDifference+=1;
    this.currentSelectedIndex++;
  }


}
