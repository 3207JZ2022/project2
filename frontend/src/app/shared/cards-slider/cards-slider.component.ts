import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards-slider',
  templateUrl: './cards-slider.component.html',
  styleUrls: ['./cards-slider.component.css']
})
export class CardsSliderComponent {
  @Input() unprocessedItems:any[];
  @Input() width:number=250;
  @Input() height:number=250;
  items: {title: string, imgSrc: string, id:number}[] = [];
  @ViewChild('listRef') listRef: ElementRef;
  @Input() vertical=false;
  @Input() sliderHeight=720;
  horizontalControlBtnStyle={
    width: "20px",
    height: this.width+"px"
  };

  verticalControlBtnStyle={
    width: "20px",
    height: this.height+"px"
  };
  sliderStyle={

  }

  timer:any;

  @Input() bindFunction: (args: any) => void =((index)=>{});


  constructor(private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(){
    if(!this.unprocessedItems) return;
    if(this.unprocessedItems.length>0&&
      this.unprocessedItems[0].name&&
      this.unprocessedItems[0].imgSrc&&
      this.unprocessedItems[0].id){
      for(let i=0;i<this.unprocessedItems.length; i++){
        this.items.push({
          title:this.unprocessedItems[i].name,
          imgSrc:this.unprocessedItems[i].imgSrc,
          id:this.unprocessedItems[i].id
        })
      }

      this.horizontalControlBtnStyle={
        width: "35px",
        height: this.width*1.1+"px"
      }
      this.verticalControlBtnStyle={
        height: "35px",
        width: this.height*1.1+"px"
      };
      if(this.vertical){
        if(window.innerWidth<=1680){
          this.sliderStyle={
            height: this.sliderHeight+"px"
          }
        }else{
          this.sliderStyle={
            height: Math.max(Math.min(1500, window.innerWidth*0.9-15)/2.213, window.innerHeight*0.9)+"px"
          }
        }
      }
    }

    this.timer=setInterval(()=>{
      if(this.vertical){
        if(window.innerWidth<=1680){
          this.sliderStyle={
            height: this.sliderHeight+"px"
          }
        }else{
          this.sliderStyle={
            height: Math.max(Math.min(1500, window.innerWidth*0.9-15)/2.213, window.innerHeight*0.9)+"px"
          }
        }
      }
    },
    400)
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  slideLeft(){
    this.listRef.nativeElement.scrollBy({left:-this.width*1.1, behavior: "smooth"})

  }

  slideRight(){
    this.listRef.nativeElement.scrollBy({left:this.width*1.1, behavior: "smooth"})

  }

  slideUp(){
    this.listRef.nativeElement.scrollBy({top:-this.height*1.1, behavior: "smooth"})

  }

  slideDown(){
    this.listRef.nativeElement.scrollBy({top:this.height*1.1, behavior: "smooth"})
  }
}

