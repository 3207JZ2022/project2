import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'timeFormat'})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    if(value===0) return "0:00";

    // let currentMinutes = Math.floor(value / 60)
    // let currentSeconds = Math.floor(value - currentMinutes * 60)
    let durationMinutes = Math.floor(value / 60)
    let durationSeconds = Math.floor(value - durationMinutes * 60)
  
    // currentTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0'+currentSeconds : currentSeconds}`
    // return durationMinutes>0? durationMinutes+":"+durationSeconds : durationSeconds+"";
    return durationSeconds<10? durationMinutes+":0"+durationSeconds : durationMinutes+":"+durationSeconds;
  }
}