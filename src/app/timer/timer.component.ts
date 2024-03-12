import { Component, Input, OnInit, OnDestroy  } from '@angular/core';
import{interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  @Input() countdownTime: number = 0;
  remainingTime:number = 0;
  private timerSubscription: Subscription| undefined;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(){
    if(this.countdownTime<=0)
    {
    return;
    }
    else{
    const startTime = new Date().getTime();
    this.timerSubscription = interval(1000).subscribe(()=>{
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      this.remainingTime = Math.max(0, this.countdownTime -elapsedTime);
      // console.log(this.remainingTime);
      if(this.remainingTime<=0)
      {
        this.stopTimer();
      }
    })
  }
  }

  stopTimer(){
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe();
      console.log("timeout");
    }

  }


  formatTime(milliseconds: number): string {
    if (milliseconds <= 0) {
      return '';
    }
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedDays = days < 10 ? '0' + days : days;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${formattedDays}天:${formattedHours}時:${formattedMinutes}分:${formattedSeconds}秒`;
  }
}
