/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var JWT = require('machinepack-jwt'),
  Passwords = require('machinepack-passwords'),
  service=require('../services/services'),
  validator = require('validator');

module.exports = {

  login : function(req,res){

    var body=req.body;

    User.findOne({email : body.email})
      .populateAll()
      .exec(function(err, user) {
        if(err || !user) {
          res.status(404).json({
            "status" : 'Fail',
            "developerMessage" :"",
            "userMessage" : "Your are not registered user",
            "errorCode" : "404"
          });
        }

        Passwords.checkPassword({
          passwordAttempt: req.body.password,
          encryptedPassword: user.password
        }).exec({
          // An unexpected error occurred.
          error: function (err){
            res.status(404).json({
              "status" : 'Fail',
              "developerMessage" :"",
              "userMessage" : "something went wrong with server",
              "errorCode" : "404"
            });
          },
          // Password attempt does not match already-encrypted version
          incorrect: function (){
            res.status(400).json({
              "status" : 'Fail',
              "developerMessage" :"",
              "userMessage" : "Password Incorrect",
              "errorCode" : "400"
            });
          },
          // OK.
          success: function (){
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
          }
        });
      });
  },

  register : function(req,res){

    if(!validator.isEmail(req.body.email)){

      return res.status(400).json({
        "status" : 'Fail',
        "developerMessage" :"Invalid attribute type",
        "userMessage" : "Enter valid email",
        "errorCode" : "400"

      });
    }else{
      User.create(req.body).exec(function(err, newuser) {
        if (err) {
          return res.status(400).json({
            "status" : 'Fail',
            "developerMessage" :"Some thing went wrong when create user",
            "userMessage" : "Can't create",
            "errorCode" : "400"

          });
        }
        if (newuser) {

              var pay={
                id : newuser.id,
                email : newuser.email,
                username : newuser.username
              };
              JWT.encode({
                secret: service.secret,
                payload: pay
              }).exec({
                // An unexpected error occurred.
                error: function (err){
                  return res.negotiate({
                    "status" : 'Fail',
                    "developerMessage" :"Some thing went wrong when create token",
                    "userMessage" : "Technical issue",
                    "errorCode" : "500"

                  });
                },
                // OK.
                success: function (token){
                  return res.json({ token: token, user: newuser})
                }
              });
        }
      });
    }

  }

};

