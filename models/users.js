// Model for Collection users
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  password: {type: String, required: true},
  name: {type: String, default: ""},
  email: {type: String, unique: true, required: true}
});

UserSchema.methods.apiRepr = function() {
  return {
    _id: this._id,
    name: this.name || '',
    email: this.email || ''
  };
}


UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('Users', UserSchema, 'users');

module.exports = {User};
