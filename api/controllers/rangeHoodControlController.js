'use strict';

const Gpio = require('orange-pi-gpio');
let gpio1 = new Gpio({pin:1, mode: 'out'}); // Range Hood Power Button
let gpio4 = new Gpio({pin:4, mode: 'out'}); // Range Hood Speed 1 Button
let gpio5 = new Gpio({pin:5, mode: 'out'}); // Range Hood Speed 2 Button
let gpio11 = new Gpio({pin:11, mode: 'out'}); // Range Hood Speed 3 Button
let gpio22 = new Gpio({pin:22, mode: 'out'}); // Range Hood Speed 4 Button
let gpio23 = new Gpio({pin:23, mode: 'out'}); // Range Hood Light Button

//TODO: Add Variable to track fan state. Q: Are variables in NodeJS persistant through requests? 
//TODO: Remove states from Lights as they are state less. E: Unless we want to add inteligent state tracking to prevent duplicate command exec.


exports.list_all_functions = function(req, res) {
  console.log('List All Available Functions');
  res.json('Function List')
};

exports.fan = function(req, res) {
  console.log('Fan: ');
  switch(req.body.state){
    case 'on':
      console.log('On');
      res.json('Fan On');
      singleButtonPress(gpio1);
    break;
    case 'off':
      console.log('Off');
      res.json('Fan Off');
      doubleButtonPress(gpio1, gpio1);
    break;
    default:
      console.log('Error: unknown state.');
      res.json('Fan Unknown State');
  }
};

exports.fan_speed = function(req, res) {
  console.log('Fan Speed: ');
  switch(req.body.state){
   case 1:
     console.log('1');
     res.json('fan speed 1');
     singleButtonPress(gpio4);
   break;
   case 2:
     console.log('2');
     res.json('fan speed 2');
     singleButtonPress(gpio5);
   break;
   case 3:
     console.log('3');
     res.json('fan speed 3');
     singleButtonPress(gpio11);
   break;
   case 4:
     console.log('4');
     res.json('fan speed 4');
     singleButtonPress(gpio22);
   break;
   default:
     console.log('Fan Unknown State');
     res.json('Fan Speed Unknown State');
  }
};

exports.light = function(req, res) {
  console.log('Light: ');
  switch(req.body.state){
    case 'on':
      console.log('On')
      res.json('light on');
      singleButtonPress(gpio23);
    break;
    case 'off':
      console.log('Off')
      res.json('light off');
      singleButtonPress(gpio23);
    break;
    default:
      console.log('Error: unknown state.')
      res.json('light error unknown state');
  }
};

function doubleButtonPress(pin_1, pin_2) {
  singleButtonPress(pin_1);
  setTimeout(function() {
    singleButtonPress(pin_2);
  }, 1000);
}

function singleButtonPress(pin) {
  pin.write(0); // write 1 to pin 5
  pin.write(1); // write 0 to pin 5
  console.log('Emulate Button Press');
}

