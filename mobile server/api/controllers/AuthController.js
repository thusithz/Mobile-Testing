/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var JWT = require('machinepack-jwt'),
  Passwords = require('machinepack-passwords'),
  service=require('../services/services');

module.exports = {

  login : function(req,res){

    var body=req.body;
    console.log(body);
    User.findOne({where:{ or : [{email : body.email},{username : body.email}]}})
      .populateAll()
      .exec(function(err, user) {
        if(err || !user) {
          console.log('In');
          return res.serverError(err);
        }
        var payload={
          id : user.id,
          email : user.email,
          username : user.username
        };
        JWT.encode({
          secret: service.secret,
          payload: payload
        }).exec({
          // An unexpected error occurred.
          error: function (err){
            return res.negotiate({
              "status" : 'Fail',
              "developerMessage" :"Something went wrong with encoding",
              "userMessage" : "Technical issue",
              "errorCode" : "500"
            });
          },
          // OK.
          success: function (token){
            return res.json({ token: token, user: user})
          }
        });
      });
  },

  register : function(req,res){

    User.create(req.body).exec(function(err,user){
      if(err){
        return res.json({err:err});
      }
      return res.json({user:user});
    })

  }

};

