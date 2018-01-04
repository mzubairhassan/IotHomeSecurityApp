import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { SensordataService } from '../../services/data.service';

@Component({
  selector: 'app-datalogging',
  templateUrl: './datalogging.component.html',
  styleUrls: ['./datalogging.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataloggingComponent implements OnInit {

  // constructor() { }

  // sensorValues = [
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  //   {time:Date(), gas:323, distance:343, motion:343},
  // ];
  // iterator =  1;
  // ngOnInit() {
  // }

  ngOnInit(){}
  array = [];
  sum = 12;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 7;
  direction = '';
  title = "asdasd" ;


  constructor(private dataService: SensordataService,private flashMessage: FlashMessagesService,) {
    this.appendItems(0, this.sum);
    //debugger
    //console.log(systemConfig);


    
  }
  
  addItems(startIndex, endIndex, _method) {


    this.dataService.getValuesPerLimit(this.sum).subscribe(data => {
      if(data.success){
        console.log(data);
        for(var i=0; i < 12; i++){

          this.array[_method]({
            "date": data.value[i]._id,
            "gas": data.value[i].values.gas,
            "motion":data.value[i].values.motion,
            "distance":data.value[i].values.distance
            
            });
        }
        console.log(this.array);
      }
      else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        
      }
        
      
    })

    
  }
  
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }
  
  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);

    // add another 10 items
    const start = this.sum;
    this.sum += 12;
    this.appendItems(start, this.sum);
    
    this.direction = 'down'
  }
  
  onUp(ev) {
    console.log('scrolled up!', ev);
    const start = this.sum;
    this.sum += 12;
    this.prependItems(start, this.sum);
  
    this.direction = 'up';
  }
  

}
