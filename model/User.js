const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { DEFAULT_VALUE } = require('../commons/helper');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  userType: String,
  first_name: { type: String, default: DEFAULT_VALUE.FIRST_NAME },
  last_name: { type: String, default: DEFAULT_VALUE.LAST_NAME },
  user_id: String,
  dob: String,
  address: {
    house_no: { type: Number, default: DEFAULT_VALUE.ADDRESS.HOUSE_NO },
    street_name: { type: String, default: DEFAULT_VALUE.ADDRESS.STREET_NAME },
    city: { type: String, default: DEFAULT_VALUE.ADDRESS.CITY },
    province: { type: String, default: DEFAULT_VALUE.ADDRESS.PROVINCE },
    postal_code: { type: String, default: DEFAULT_VALUE.ADDRESS.POSTAL_CODE }
  },
  car_details: {
    make: { type: String, default: DEFAULT_VALUE.CAR_DETAILS.MAKE },
    model: { type: String, default: DEFAULT_VALUE.CAR_DETAILS.MODEL },
    year: { type: Number, default: DEFAULT_VALUE.CAR_DETAILS.YEAR },
    plat_no: { type: String, default: DEFAULT_VALUE.CAR_DETAILS.PLAT_NO }
  },
  license_no: { type: String, default: DEFAULT_VALUE.LICENSE_NO },
  images: [String],
  appointment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  test_type: String,
  comments: String,
  examiner_feedback: Boolean
});

UserSchema.pre('save', function (next) {
  const user = this;

  const passwordHash = bcrypt.hashSync(user.password, 10);
  user.password = passwordHash;
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update;

  if (user.license_no) {
    const licensehash = bcrypt.hashSync(user.license_no, 5);
    user.license_no = licensehash;
  }

  next();
});

UserSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;
