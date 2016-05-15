/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var Passwords = require('machinepack-passwords'),
  moment = require('moment');


module.exports = {

  schema: true,

  attributes: {

    id : {
      type: 'integer',
      primaryKey: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string'
    },
    password: {
      type: 'string',
      required : true

    },
    email: {
      type: 'string',
      unique: true

    },
    firstname: {
      type: 'string'

    },
    lastname: {
      type: 'string'

    },
    phone: {
      type: 'string'

    },
    createdAt: {
      type: 'datetime',
      required: true
    },
    updatedAt: {
      type: 'datetime',
      required: true
    },
    deletedAt: {
      type: 'datetime',
      required: false
    },
    toJSON: function() {
      var obj = this.toObject();
      obj.createdAt = moment(obj.createdAt).format('Y-MM-D H:mm:ss');
      obj.updatedAt = moment(obj.updatedAt).format('Y-MM-D H:mm:ss');
      delete obj.password;
      return _.omit(obj, 'deletedAt');
    }
  },

  beforeCreate : function(values, next) {
    Passwords.encryptPassword({
      password: values.password,
      difficulty: 10
    }).exec({
      error: function(err) {
        return res.negotiate(err);
      },
      success: function(hash) {
        values.password = hash;
        next();
      }
    });
  }
};
