const Appointment = require('../model/Appointment');
const User = require('../model/user');

module.exports = (req, res) => {
  let { test_type, user } = req.query;

  if (!test_type) {
    test_type = 'all';
    return res.redirect('/examiner?test_type=' + test_type);
  }

  User.find({ appointment_id: { $exists: true } }, async (err, users) => {
    if (err) {
      console.log('Error: ', err);
    }

    const userWithAppointments = [];

    for (const user of users) {
      if (
        (user.test_type === test_type || test_type === 'all') &&
        user.examiner_feedback == undefined
      ) {
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

    return res.render('examiner', {
      userWithAppointments,
      test_type,
      user
    });
  });
};
