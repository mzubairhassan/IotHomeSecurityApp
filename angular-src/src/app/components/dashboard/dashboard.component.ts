import { Component,OnInit,OnDestroy,ViewEncapsulation,ViewChild} from '@angular/core';
import {SensordataService} from "../../services/data.service";
import { ChartComponent} from 'angular2-highcharts/index';
import { CheckService } from "../../services/check.service";
import {ToasterService} from 'angular2-toaster';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('chartVar') refObj: any;

  messages = [];
  connection;
  message;
  options: Object;

  private statusMessage: string ;


  private gasValue: any;
  private motionValue: any;
  private distanceValue: any;
  private SMon: any;
  private SSec: any;
  private SMin: any;
  private SDay: any;
  private SHr: any;
  private SYr: any;
  private gasRed: any;
  private distanceRed: any;
  private motionRed: any;

  private sensorData = {
    gas: Number,
    motion: Number,
    distance: Number
  };

  private applyDanger:any;
  constructor(
    private sensorDataService: SensordataService,
    private checkService: CheckService,
    private toasterService: ToasterService
  
  ) {

  }
  ngOnInit() {
    this.renderChart();

    
    this.connection = this.sensorDataService.getValues().subscribe(message => {

      
       console.log("Message Values 1st"+message.toString());
      this.gasValue = message["values"]['gas'];
      this.motionValue = message["values"]['motion'];
      this.distanceValue = message["values"]['distance'];

      this.SHr = new Date(message["_id"]).getHours();
      this.SSec = new Date(message["_id"]).getSeconds();
      this.SMin = new Date(message["_id"]).getMinutes();
      this.SDay = new Date(message["_id"]).getHours();
      this.SMon = new Date(message["_id"]).getMonth() +1;
      this.SYr = new Date(message["_id"]).getFullYear(); 



      this.sensorDataService.getThresholdValues().subscribe(thresholdValues => {
        console.log("Threshold Values coming from getValues: " + thresholdValues.toString());
        console.log("message Values : " + message.toString());
        let checkResult = this.checkService.checkThresholdLimit(message, thresholdValues);
        console.log(checkResult);
        console.log(checkResult);

        this.gasRed = this.gasRed;
        this.motionRed = false;
        this.statusMessage = "Protected";
        this.applyDanger = false;

        if(checkResult.gasRed == true){
          this.gasRed = true;
          this.applyDanger = true;
          this.statusMessage = "Danger";
          this.toasterService.pop('warning', 'Warning', 'Gas Threshold Reached > '+thresholdValues['values'].gas);
        }else{

          this.gasRed = false;
          this.applyDanger = false;
          this.statusMessage = "Protected";
        }
        if(checkResult.motionRed == true){
          this.motionRed = true;
          this.applyDanger = true;
          this.statusMessage = "Danger";
          this.toasterService.pop('warning', 'Warning', 'Motion Threshold Reached > '+thresholdValues['values'].motion);
        }else{
          this.motionRed = false;
          if(this.applyDanger == true){
            this.applyDanger = true;
            this.statusMessage = "Danger";
          } else{
            this.applyDanger = false;
            this.statusMessage = "Protected";
          }
          
        }
        if(checkResult.distanceRed == true){
          this.distanceRed = true;
          this.applyDanger = true;
          this.statusMessage = "Danger";
          this.toasterService.pop('warning', 'Warning', 'Distance Threshold Reached > '+thresholdValues['values'].distance);
        }else{
          this.distanceRed = false;
          if(this.applyDanger == true){
            this.applyDanger = true;
            this.statusMessage = "Danger";
          } else{
            this.applyDanger = false;
            this.statusMessage = "Protected";
          }
        }
        
        
      })
      
      //this.messages.push(message);
      //message["gas"] = +message["gas"];
      this.refObj.chart.series[0].addPoint(message["values"]["gas"], false);
      //this.refObj.chart.redraw();

      //this.messages.push(message);
      //message["motion"] = +message["motion"];
      //this.refObj.chart.series[2].addPoint({ x: message["date"], y: null }, false);
      this.refObj.chart.series[1].addPoint(message["values"]["motion"], false);
      //this.refObj.chart.redraw();

      //this.messages.push(message);
      //message["distance"] = +message["distance"];
      this.refObj.chart.series[2].addPoint(message["values"]["distance"], false);
      this.refObj.chart.redraw();


    })


  }

  ngOnDestroy() {
     this.connection.unsubscribe();
  }


  
  renderChart() {
    this.options = {
      rangeSelector: {
        buttons: [{
          count: 1,
          type: 'minute',
          text: '1M'
        }, {
          count: 5,
          type: 'minute',
          text: '5M'
        },
        {
          
          type: 'all',
          text: 'All'
        }],
        inputEnabled: false,
        selected: 0
      },

      title: {
        text: 'Live Sensor Readings'
      },
      
      xAxis: {
        opposite: true
      },
      yAxis: { opposite: true },
      exporting: {
        enabled: true
      },

      series: [{
        name: 'Gas(unit)',
        data: []
      },
      {
        name: 'Motion(unit)',
        data: []
      },
      {
        name: 'Distance(cm)',
        data: []
      }
      ]

    }
  }
  chart: Object;

  loadChart(chartInstance) {
    this.chart = chartInstance;
  }

}
