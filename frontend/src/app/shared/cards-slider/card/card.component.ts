import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() item:{
    title: string, imgSrc: string, id:number
  }

  @Input() width:number = 250;
  @Input() bindFunction: (args: any) => void =((index)=>{});

  cardStyle={
    width: this.width+"px",
    height: this.width+"px"
  }

  constructor(private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(){
    this.cardStyle={
      width: this.width+"px",
      height: this.width+"px"
    }
  }
}
