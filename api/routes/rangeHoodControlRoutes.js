'use strict';
module.exports = function(app) {
  var rangeHoodCtrl = require('../controllers/rangeHoodControlController');

  // todoList Routes
  app.route('/function')
    .get(rangeHoodCtrl.list_all_functions);

  app.route('/function/fan')
    .put(rangeHoodCtrl.fan);

  app.route('/function/fan_speed')
    .put(rangeHoodCtrl.fan_speed);

  app.route('/function/light')
    .put(rangeHoodCtrl.light);
};
