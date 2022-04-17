const {
  deSerializeData,
  DEFAULT_VALUE,
  formattedDate
} = require('../commons/helper');
const Appointment = require('../model/Appointment');
const User = require('../model/user');

module.exports = (req, res) => {
  let { error, date } = req.query;
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }

  if (!date) {
    date = formattedDate(new Date());
    return res.redirect('/g2_test?date=' + date);
  }

  User.findById(req.session.userId, (err, user) => {
    if (err) {
      console.log('Error: ', err);
    }
    const deSerializedUser = deSerializeData(user);
    console.log('deSerializedUser: ', deSerializedUser);

    const isAppointmentBooked = deSerializedUser.appointment_id ? true : false;

    Appointment.find(
      isAppointmentBooked
        ? {
            _id: deSerializedUser.appointment_id
          }
        : {},
      (err, appointments) => {
        if (err) {
          console.log('Error: ', err);
        }

        let filteredAppointments;
        if (isAppointmentBooked) {
          filteredAppointments = appointments[0];
        } else {
          filteredAppointments = appointments.filter(
            (appointment) =>
              appointment.Date === date && appointment.isTimeSlotAvailable
          );
        }

        return res.render('g2_test', {
          error,
          appointments: filteredAppointments,
          date,
          utils: { formattedDate },
          user:
            deSerializedUser.license_no === DEFAULT_VALUE.LICENSE_NO
              ? {}
              : deSerializedUser
        });
      }
    );
  });
};
