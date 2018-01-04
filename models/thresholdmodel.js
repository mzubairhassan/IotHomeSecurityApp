const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const ThresholdSchema = mongoose.Schema({
    _id: Number,
    gas: {
        type: Number,
        required: true
    },
    motion: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    alarmStatus: {
        type: Boolean,
        required: true
    }
});

const Threshold = module.exports = mongoose.model('Thresholds', ThresholdSchema);

module.exports.addValues = function (newThresholds, callback) {

    // revise this query to update query
    newThresholds._id = 1;
    console.log(newThresholds);
    Threshold.update({_id:1}, newThresholds, callback);

}

module.exports.getValues = function (callback) {
    
        
        Threshold.findOne({_id:1},callback);
    
    }

    module.exports.getValuesForArduino = function (callback) {
        
            
            Threshold.findOne({_id:1},callback);
        
        }
