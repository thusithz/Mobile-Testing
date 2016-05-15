
var JWT = require('machinepack-jwt'),
   service=require('../services/services');


module.exports = function(req,res,next){

  if(!req.headers.authorization) return handleError(res);
  var token = req.headers.authorization.split(' ')[1];
  JWT.decode({
    secret: service.secret,
    token: token
  }).exec({
    error: function (err){
      return handleError(res);
    },
    success: function (result){
      req.user = result;
      next();
    }
  });
 };

function handleError (res){
  return res.status(401).send({  error : "You are not Authorized" })
}
