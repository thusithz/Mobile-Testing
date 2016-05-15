/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  update : function(req,res){
    console.log(req.body);
    User.update({ id :req.user.id},req.body).exec(function(err,user){
      if(err || user.length ==0 ){}
      return res.json(user[0]);
    });
  },

  user :function(req,res){
    User.findOne({ id :req.user.id})
      .populateAll()
      .exec(function(err, user) {
        if(err){}
        if(!user){}

        return res.json(user)
      });
  }
};

