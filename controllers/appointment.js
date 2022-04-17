const Appointment = require('../model/Appointment');
const { generateAppointmentSlot, formattedDate } = require('../commons/helper');

module.exports = (req, res) => {
  let { date } = req.query;

  if (!date) {
    date = formattedDate(new Date());
    return res.redirect('/appointment?date=' + date);
  }

  Appointment.find({}, (err, appointments) => {
    if (err) {
      console.log('Error: ', err);
    }
    let allAppointments = generateAppointmentSlot(date, '09:00', '14:00', 30);

    let filteredAppointments = allAppointments.map((appointment) => {
      appointments.forEach((appointmentInDb) => {
        if (
          appointmentInDb.Date === appointment.Date &&
          appointmentInDb.Time === appointment.Time
        ) {
          appointment.isTimeSlotAvailable = appointmentInDb.isTimeSlotAvailable;
        }
      });
      return appointment;
    });

    return res.render('appointment', {
      appointments: filteredAppointments,
      utils: { formattedDate },
      date
    });
  });
};
