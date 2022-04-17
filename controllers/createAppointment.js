const Appointment = require('../model/Appointment');
const { generateAppointmentSlot, formattedDate } = require('../commons/helper');

module.exports = (req, res) => {
  let { date, time } = req.query;

  let payload = {
    Date: date,
    Time: time,
    isTimeSlotAvailable: true
  };

  Appointment.create(payload, (err, appointment) => {
    if (err) {
      console.log('Error: ', err);
    }
    return res.redirect('/appointment?date=' + date);
  });
};
