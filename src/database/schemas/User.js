const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  blocked: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  lastLogged: {
    type: mongoose.SchemaTypes.Date,
    default: null,
  }
});

module.exports = mongoose.model('users', UserSchema);