const db = require('../config/db');


insertweatherDatafn = (data) =>{
	//console.log(">>",data);

    var dataRes = JSON.stringify(data);
   return new Promise((resolve, reject)=>{

   	let insertRes = `INSERT INTO weather_data(data) VALUES ('${dataRes}')`;
      db.query(insertRes,  (error, results)=>{
      	//console.log(error, results);
         if(error){
            return reject(error);
         }
         return resolve(results);
      });
   });
};

module.exports = {
    weatherData: async function(con, data, callback) {
        //console.log(data);
        //var result = {};
        
        var insertRes = await insertweatherDatafn(data);
        callback(null, insertRes);
    }
}