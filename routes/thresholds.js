const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Threshold = require('../models/thresholdmodel');

// Register
router.post('/addValues', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    let newThresholds = new Threshold({
      gas: req.body.gas,
      motion: req.body.motion,
      distance: req.body.distance,
      alarmStatus: req.body.alarmStatus
    });
    
    Threshold.addValues(newThresholds, (err, thresholds) => {
      if(err){
          
        res.json({success: false, msg:'Failed to add new thresholds'});
      } else {
        res.json({success: true, msg:'Thresholds added', addedThreshold:thresholds});
      }
    });
  });


  router.get('/getValues', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    
    
    Threshold.getValues((err, thresholds) => {
      if(err){
          
        res.json({success: false, msg:'Failed to get threshold Values'});
      } else {
        console.log("Thresholds Vals from get values server"+thresholds);
        res.json({success: true, msg:'Thresholds', values: thresholds});
      }
    });
  });


  router.get('/getValuesForArduino', (req, res, next) => {
    
    
    Threshold.getValues((err, thresholds) => {
      if(err){
          
        res.json({success: false, msg:'Failed to get threshold Values'});
      } else {
        console.log("Thresholds Vals from get values server"+thresholds);
        res.json({success: true, msg:'Thresholds', values: thresholds});
      }
    });
  });
  
  module.exports = router;
  

