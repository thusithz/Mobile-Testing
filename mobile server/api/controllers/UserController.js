/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update : function(req,res){
     console.log(req.user);

    return res.json({user:req.user});
  }
};

