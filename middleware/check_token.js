const { verify } = require('jsonwebtoken');

module.exports = {
 checkToken: function(req, res, next) {
 	let token = req.get('authorization');
 	if(token)
 	{
 		token = token.slice(7);
 		verify(token,'abcdef',(err,decode) => {
 			if(err)
 			{
 				res.json({
 					error:err,
 					success:0,
 					message:"invalid token"
 				})
 			} else {
 				next();
 			}
 		});
 	} else {
 		res.json({
			success:0,
			message:"Access denied unauthorized user"
		})
 	}
  }
	//checkLogin
}


