var express = require('express');
var router = express.Router();
var getWeathercontroller = require('../controller/WeatherController');
//var startExam = require('../controller/StartExamController');
//var { checkToken } = require('../middleware/check_token');

router.get('/get-weather/:date', getWeathercontroller.getWeatherfn);

module.exports = router;
