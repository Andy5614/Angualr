import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from './safe-url.pipe';
import { CommodityComponent } from './commodity/commodity.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PayComponent } from './pay/pay.component';
import { EcpayviewComponent } from './ecpayview/ecpayview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimerComponent } from './timer/timer.component';
import { DateDifferencePipe } from './date-difference.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { CircularProgressBarComponent } from './circular-progress-bar/circular-progress-bar.component';











@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    SafeUrlPipe,
    CommodityComponent,
    PayComponent,
    EcpayviewComponent,
    TimerComponent,
    DateDifferencePipe,
    CircularProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgbModule,
    KnobModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
