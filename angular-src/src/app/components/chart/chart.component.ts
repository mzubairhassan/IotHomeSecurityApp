import { Component,ElementRef,ViewChild,OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {
  ChartModule
} from 'angular2-highcharts'; 
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent {

  constructor() { 

    this.options = {
      title : { text : 'simple chart' },
      series: [{
          data: [29.9, 71.5, 106.4, 129.2],
      }]
  };
  }

  options: Object;

}
