const mongoose = require('mongoose');

const { Schema } = mongoose;

const AppointmentSchema = new Schema({
    Date: String,
    Time: String,
    isTimeSlotAvailable: Boolean
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
