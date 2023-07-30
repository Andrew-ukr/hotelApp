const mongoose = require('mongoose');
import isEmail from 'validator/lib/isEmail';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
});

const User = mongoose.model('User', userSchema);

export { User }
