import { Component } from '@angular/core';
import { faGithub, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faGithunb=faGithub
  faLinkedin=faLinkedin
  faTwitter=faTwitter
  faYoutube=faYoutube
  webCollection: {
    name:string,
    href:string,
    description:string,
    icon: typeof faGithub
  }[]=
  [{
    name: "GitHub",
    href: "https://github.com/3207JZ2022",
    description: "My GitHub" ,
    icon: faGithub 
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jian-zhang-595154201/",
    description: "My LinkedIn Profile"  , 
    icon: faLinkedin
  }]

  constructor(){

  }
  

}