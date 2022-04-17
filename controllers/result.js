const Appointment = require('../model/Appointment');
const User = require('../model/user');

module.exports = (req, res) => {
  let { result } = req.query;

  if (!result) {
    result = 'all';
    return res.redirect('/result?result=' + result);
  }

  User.find({ appointment_id: { $exists: true } }, async (err, users) => {
    if (err) {
      console.log('Error: ', err);
    }

    const userWithAppointments = [];

    for (const user of users) {
      if (String(user.examiner_feedback) == result || result === 'all') {
        const appointment = await Appointment.findById(
          user.appointment_id.toString()
        );

        console.log(appointment);

        userWithAppointments.push({
          user,
          appointment
        });
      }
    }

    return res.render('result', {
      userWithAppointments,
      result
    });
  });
};
