import { Component, 
         Input, 
         ElementRef, 
         ViewChild 
        } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, fromEvent, withLatestFrom, zipWith } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        transform: 'translateX(0)',
      })),
      state('right', style({
        transform: 'translateX({{translateX}}px)'
      }),{params:{translateX:400}}),
      state('left', style({
        transform: 'translateX(-{{translateX}}px)'
      }),{params:{translateX:400}}),
      state('select', style({})),
      transition('normal => left', 
        animate('{{time}}ms')  
      ),
      transition('normal => right', [animate('{{time}}ms')]),
      transition('normal => select',[
        animate('{{halfTime}}ms', keyframes([
          style({
            opacity: 1,
            offset: 0
          }),
          style({
            opacity: 0.6,
            offset: 0.5
          }),
          style({
            opacity: 0.0,
            offset: 1
          })
        ])),
      ]),
      transition('select => normal',[
        animate('{{halfTime}}ms', keyframes([
          style({
            opacity: 0,
            offset: 0
          }),
          style({
            opacity: 0.6,
            offset: 0.5
          }),
          style({
            opacity: 1,
            offset: 1
          })
        ])),
      ])
    ]),
    trigger('scrollState',[
      state('normal', style({
        transform: 'translateX(-{{transform}}px)'
      }),{params:{transform:0}}
      ),
    ])
  ]
})
export class CarouselComponent {
  @Input() unprocessedItems: any[]|undefined = [];
  @Input() height:number= 400;
  @Input() width: number = 400;
  @Input() autoPlay: boolean = true;
  @Input() interval: number = 6000;
  @Input() transitionDuration:number = 400;
  @Input() controlBtn: boolean = true;
  @Input() controlBtnWidth: number=30;
  controlBtnHeight: number=this.height;
  @Input() title: boolean = true;
  @Input() indexDots: boolean = true;
  @Input() thumbsList: boolean = true;
  @Input() thumbHeight:number = 100;
  @Input() thumbWidth:number = 100;
  @Input() bindFunction: (args: any) => void =((index)=>{});

  @ViewChild('listRef') listRef: ElementRef;
  @ViewChild('displayRef') displayRef: ElementRef;

  touchEvent: Subscription;

  listLength: number=Number.MAX_SAFE_INTEGER;

  playSub:ReturnType<typeof setInterval>;

  items: {title: string, imgSrc: string, id:string}[] = [];

  selectedTitle: string;
  selectedIndexP: number;
  selectedIndex: number;
  selectedIndexN: number;

  timer:any;

  state:string = 'normal';
  thumbState:string='normal'

  carouselContainerStyle:{}={
    height: this.height+this.thumbHeight+"px",
    width: this.width+"px"
  }

  carouselDisplayStyle:{}={
    height: this.height+"px",
    width: this.width+"px"
  }

  carouselImgStyle:{}={
    height: this.height+"px",
    width: this.width+"px",
    left: -this.width+"px"
  };

  leftCtrlStyle:{}={
    width: this.controlBtnWidth+"px",
    height: this.controlBtnHeight+"px",
  }
  rightCtrlStyle:{}={
    width: this.controlBtnWidth+"px",
    height: this.controlBtnHeight+"px",
    right: '0px'
  }

  carouselSubStyle:{}={
    height: 36+this.thumbHeight+"px",
    width: this.width+"px"
  }
  
  previousWidth:number=-999;
  previousHeight:number=-999;

  constructor(private scroller: ViewportScroller,
              private router: Router,
              private route: ActivatedRoute){};
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
      this.selectedIndex=0;
      this.selectedIndexN=(this.selectedIndex+1)%this.items.length;
      this.selectedIndexP=(this.items.length==1? 0: this.items.length-1);



      if(this.autoPlay&&this.items.length>1){
        this.playSub=setInterval(()=>{
            this.selectNext();
        }, this.interval);
      }
    }
  }

  ngAfterViewInit() {
    if(this.unprocessedItems){
      this.resize();
      this.timer = setInterval(() =>{
        // this.height=this.width=Math.min(window.innerWidth*0.9, 660); 
         this.width=Math.min(window.innerWidth*0.90, 1820); 
         this.height=Math.min(window.innerHeight*0.90,1080);
        if(this.previousWidth!==this.width||this.previousHeight!==this.height){
          this.resize();
        };
        this.previousWidth=this.width;
        this.previousHeight=this.height;
      },500)

      this.touchEvent= fromEvent<TouchEvent>(this.displayRef.nativeElement, 'touchstart',{capture:true})
      .pipe(
        zipWith(
          fromEvent<TouchEvent>(this.displayRef.nativeElement, 'touchend',{capture:true}).pipe(
            withLatestFrom(fromEvent<TouchEvent>(this.displayRef.nativeElement, 'touchmove', {capture:true}))
          )
        )
      )
      .subscribe(([touchstart, [_, touchmove]]) => {
        const xDiff =
          touchstart.touches[0].clientX - touchmove.touches[0].clientX;
        if (Math.abs(xDiff) > 0.3 * document.body.clientWidth &&
            touchstart.timeStamp <= touchmove.timeStamp) {
          if (xDiff > 0) {
            //swipe to right
            this.selectNext()
          } else {
            //swipe to left
            this.selectPrev()
          }
        }
      });
    }


  }


  ngOnDestroy() {
    clearInterval(this.playSub);
    clearInterval(this.timer)
    if(this.unprocessedItems) this.touchEvent.unsubscribe();
  }

  resize(){
    if(this.thumbsList){
      this.carouselContainerStyle={
        height: this.height+this.thumbHeight+"px",
        width: this.width+"px"
        
      }
      this.carouselSubStyle={
        height: 36+this.thumbHeight+"px",
        width: this.width+"px"
      }
    }else{
      this.carouselContainerStyle={
        height: this.height+"px",
        width: this.width+"px"
      }
      this.carouselSubStyle={
        height: this.thumbHeight+"px",
        width: this.width+"px"
      }
    }

    this.carouselDisplayStyle={
      height: this.height+"px",
      width: this.width+"px"
    }

    this.carouselImgStyle={
      height: this.height+"px",
      width: this.width+"px",
      left: -this.width +"px"
    };

    this.leftCtrlStyle={
      width: this.controlBtnWidth+"px",
      height: this.height+"px",
    }
    this.rightCtrlStyle={
      width: this.controlBtnWidth+"px",
      height: this.height+"px",
      right: '0px'
    }

    if(this.thumbsList){
      this.listLength=this.listRef.nativeElement.scrollWidth
    }
    // console.log(this.width, this.height);
    // console.log("carousel container", this.carouselContainerStyle);
    // console.log("carousel display", this.carouselDisplayStyle)
    // console.log("carousel img",this.carouselImgStyle);
    // console.log("carousel sub",this.carouselSubStyle);
  }

  scrollThumbIntoView(){
    if(this.thumbsList){
      let listItem =document.getElementById('selected');
      let list = document.getElementById('selectedIndex');
      
  
      listItem?.scrollTo(400,400)
      list?.scrollTo(400,400)
      if(list!=undefined&&list!=null){
      }
  
      this.listRef.nativeElement.scrollTo({
        top: '500px',
        left: '500px',
        behavior: "smooth",
      });
  
  
      this.listRef.nativeElement.scrollBy({left:400, behavior: "smooth"});
    }
  }

  scrollIndex(){
    this.getSelectedElement()?.scrollTo({
      top: 1000,
      left: 1000,
      behavior:"smooth"
    })
  }

  getSelectedElement():HTMLElement|null{
    return document.getElementById('selected')
  }


  selectNext(){
    this.state='right';
    setTimeout(()=>{
      this.selectedIndex=(this.selectedIndex+1)%this.items.length;
      this.selectedIndexN=(this.selectedIndexN+1)%this.items.length;
      this.selectedIndexP=(this.selectedIndexP+1)%this.items.length;
      this.state='normal'
    },this.transitionDuration)
  }

  selectPrev(){
    this.state='left';
    setTimeout(()=>{
      this.selectedIndex=
      (this.selectedIndex==0? this.items.length-1: this.selectedIndex-1 );
      this.selectedIndexN=
      (this.selectedIndexN==0? this.items.length-1: this.selectedIndexN-1 );
      this.selectedIndexP=
      (this.selectedIndexP==0? this.items.length-1: this.selectedIndexP-1 );
      this.state='normal'
    },this.transitionDuration);
  }

  selectItem(index:number, event: Event){
    // event?.target?.focus();
    this.state='select'
    setTimeout(()=>{
      this.selectedIndex=index;

      this.selectedIndexN=(index+1)%this.items.length;
      this.selectedIndexP=(index==0? this.items.length-1 : index-1)
      this.state='normal'

    },this.transitionDuration/2)
  }

  selectItem1(index:number){
    this.state='select'
    setTimeout(()=>{
      this.selectedIndex=index;

      this.selectedIndexN=(index+1)%this.items.length;
      this.selectedIndexP=(index==0? this.items.length-1 : index-1)
      this.state='normal'

    },this.transitionDuration/2)
  }

}
