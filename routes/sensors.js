
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Sensor = require('../models/sensormodel');
const Threshold = require('../models/thresholdmodel');
var sleep = require('system-sleep');

router.get('/getLastValue', (req,res,next)=>{
  
  Sensor.getLastValue((err, values)=>{
    if(err){
      console.log(err);
    }
    else {
      console.log(values);
    }
  })
})
  

router.get('/getValue', (req,res,next)=>{
  
  Sensor.getValues((err, values)=>{
    if(err){
      console.log(err);
    }
    else {
      res.json({success: true, msg:'Sensor Values Added', Values: values});
    }
  })
})

router.post('/addValueFake', (req,res,next)=>{


  let  newValues = new Sensor({
          
    _id: new Date(),
    values:{
      gas: eq.body.gas,
      motion: req.body.motion,
      distance: req.body.distance
    }
    
    
    
  });
  
  Sensor.addValueFake(newValues, (err, values)=>{
    if(err){
      console.log(err);
    }
    else {
      console.log(values);
      res.json({success: true, msg:'Sensor Values Added', Values: values});
    }
  })
      
        
});

router.post('/getValuesPerLimit',passport.authenticate('jwt',{session: false}), (req,res,next) => {
  console.log("Limit::"+ req.body);
  console.log("Limit::"+ req.query);
  Sensor.getValuesPerLimit(req.body.limit, (err, values) => {
    if(err){
      console.log(values);
      res.json({success: false, msg: 'Server Down!'+err});
    }
    else {
      res.json({success: true, msg:'Values coming', value: values});
      console.log(values);
    }
  })
})
  


// saving new values of each sensor it is called only from arduino and none other.
router.get('/addValues', (req, res, next) => {
  
  console.log(req.query);
    let newValues = new Sensor({
        
        _id: new Date(),
        values:{
          gas: req.query.gas,
          motion: (req.query.motion ==1) ? 'HIGH' : 'LOW',
          distance: req.query.distance
        }
    });
    console.log("Arduino-logging: " + newValues);
    Sensor.addValues(newValues, (err, savedValues) => {
      if(err){
          
        res.json({success: false, msg:'Failed save sensor values'});
        
      } else {
        Threshold.getValuesForArduino((err, values)=>{
          console.log("valuesT::"+values);
          reply: String;
          alarmS:String;
          if(values['alarmStatus'] == 'true'){
            alarmS = "1";
          }else { alarmS = "0";}

          reply = "g"+values['gas']+"m"+values['motion']+"d"+values['distance']+"a"+alarmS+":!";
          console.log("reply :" + reply);
          res.send(reply.toString());
        })
        
      }
    });
  });
  
  
  module.exports = router;


