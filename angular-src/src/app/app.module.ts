import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { RouterModule } from "@angular/router"; 
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from "angular2-flash-messages";
import {AuthGuard} from './guards/auth.guard.service';
import { SensordataService } from "./services/data.service";
import { CheckService } from "./services/check.service";
import { ChartModule } from 'angular2-highcharts/index';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
declare var require: any;


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
    
    
  ],
  imports: [
    AppRoutingModule,
    ToasterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    InfiniteScrollModule,
    FlashMessagesModule,
    ChartModule.forRoot(require('highcharts/highstock')),
    
  ],
  providers: [ValidateService,AuthService,AuthGuard,SensordataService,ToasterService,CheckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
