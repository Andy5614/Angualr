import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.css'],
})
export class CircularProgressBarComponent {
  @Input() progress: number = 30;
  currentProgress: number = 0;
  intervalId: any;
  isComplete: boolean = false;

  ngOnInit(): void {
    this.intervalId =setInterval(()=>{
      this.currentProgress++;
      if(this.currentProgress >= this.progress || this.currentProgress>= 100){
        clearInterval(this.intervalId);
        if(this.currentProgress>= 100){
          this.isComplete = true;
        }
      }
    }, 40)

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  getStrokeColor() {
    return this.isComplete ? '#652EBA' : '#ffd700';
  }
}
