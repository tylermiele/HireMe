const mongoose = require('mongoose');
//extend the functionality of this model as its used for authentication
const plm = require('passport-local-mongoose');
const findorcreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    oauthProvider: String,
    oauthId: String
});

//convert this model from a regular model to one that inherits all the ablilities of user management
userSchema.plugin(plm);
userSchema.plugin(findorcreate);

module.exports = mongoose.model('User', userSchema);