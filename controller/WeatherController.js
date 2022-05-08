//var request = require('request'); 
const moment = require('moment');
const axios = require('axios');
const weatherModel = require('../model/weatherModel');
const db = require('../config/db');


const getWeatherfn  = async (req,res,next) => {
	var {date}= req.params;
	//console.log(">>>>",moment( date, 'DD-MM-YYYY', true).isValid());
	 try {
		if(moment( date, 'DD-MM-YYYY', true).isValid())
		{
			let splitDate = date.split('-');
			var isPrime = true
			for (let i = 2; i < splitDate[0]; i++) {
				//console.log(splitDate[0] % i,">>>",i);
				if (splitDate[0] % i == 0) {
					isPrime = false;
					break;
				}
			}
			if(isPrime)
			{
				axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=135&appid=250eae1c51a4b1dd828b579c2ba7f0ef')
				.then(res1 => {
					//console.log('Status Code:', res1.status);
					const users = res1.data;
					
					weatherModel.weatherData(req.con,users, function(err, rows) {
						if(err){
							return res.status(500).json({
								error:err,
								success:0,
								msg:"DB connection error"
							});
						}
					})
					return res.status(200).json({
						error:"",
						success:1,
						data:users,
						msg:"success"
					});
				})
				.catch(err => {
					return res.status(500).json({
						error:err.message,
						success:0,
						data:"",
						msg:"error"
					});
					//console.log('Error: ', err.message);
				});
			} else {
				return res.status(200).json({
					error:"Date is not prime so you can’t request the data",
					success:0,
					data:"data not found",
					msg:"success"
				});
			}

		} else {
			return res.status(200).json({
				error:"Date is not valid.",
				success:0,
				data:null,
				msg:"failed"
			});
		}
	} catch(e) {
		console.log(e.message)
		res.sendStatus(500) //&& next(error)
	} 

}	
module.exports = {
getWeatherfn
}