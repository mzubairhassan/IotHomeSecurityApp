import { Injectable } from '@angular/core';
import { SensordataService } from "./data.service";

@Injectable()
export class CheckService {

  constructor(private _sensorDataService: SensordataService) { }
  
  gasRed:Boolean =  false;
  motionRed:Boolean =  false;
  distanceRed:Boolean =  false;
  
  checkThresholdLimit(sensorData, thresholdValues){

    this.gasRed = false;
    this.motionRed = false;
    this.distanceRed = false;
    
    
      console.log("sensor: " + sensorData["values"]["gas"]);
      console.log("threshold: " + thresholdValues["values"].gas);

      if(
        sensorData["values"]["gas"] > thresholdValues["values"].gas
        &&
        sensorData["values"]["motion"] > thresholdValues["values"].motion
        &&
        sensorData["values"]["distance"] < thresholdValues["values"].distance
      ){
        
        this.gasRed = true;
        this.motionRed = true;
        this.distanceRed = true;
        
        return {
          
          gasRed: this.gasRed,
          motionRed: this.gasRed,
          distanceRed: this.gasRed

        };
      } else
      {
        
        if(sensorData["values"]["gas"] > thresholdValues["values"].gas){
          
          this.gasRed = true;
        }
        if(sensorData["values"]["motion"] != thresholdValues["values"].motion){
          
          this.motionRed = true;
        }
        if(sensorData["values"]["distance"] < thresholdValues["values"].distance){
          
          
          this.distanceRed = true;
          
        }
        return {
          
           gasRed: this.gasRed,
           motionRed: this.motionRed,
           distanceRed: this.distanceRed,
         };


      }
      
      

      
     
    
    
  }

}
