import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from "@angular/forms";
import { SensordataService } from "../../services/data.service";
import { FlashMessagesService } from "angular2-flash-messages";


@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BenchmarkComponent implements OnInit {

  userForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private sensorDataService: SensordataService,
    private flashMessage: FlashMessagesService
  
  ) { }

  ngOnInit() {

    this.userForm = this._formBuilder.group({
      gasThreshold: [null, [Validators.pattern('^[1-9][0-9]{2}$'),Validators.required ]],
      motionThreshold: [null, [Validators.required]],
      distanceThreshold: [null, [Validators.pattern('^[1-9][0-9]$'),Validators.required]],
      alarmRadio:[null,Validators.required]
        
    })
  }

  onSubmit(){
    const values = {
      gas: this.userForm.value.gasThreshold,
      motion: (this.userForm.value.motionThreshold == 'HIGH') ? 1 : 0,
      distance: this.userForm.value.distanceThreshold,
      alarmStatus: this.userForm.value.alarmRadio
    }

    this.sensorDataService.addThresholdValues(values).subscribe(data => {
      if(data.success){
        console.log(data);
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000});
          
        
      }
      else{
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000});
          
      }
    })
  }

  

}
