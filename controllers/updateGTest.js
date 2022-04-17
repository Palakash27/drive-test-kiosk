const Appointment = require('../model/Appointment');
const User = require('../model/user');

const { formattedDate } = require('../commons/helper');

module.exports = (req, res) => {
  console.log('req.body: ', req.body);
  let { date } = req.query;
  const { user_id, ...updatedData } = req.body;
  const payload = {
    address: {
      house_no: updatedData.house_no,
      street_name: updatedData.street_name,
      city: updatedData.city,
      province: updatedData.province,
      postal_code: updatedData.postal_code
    },
    car_details: {
      make: updatedData.make,
      model: updatedData.model,
      year: updatedData.year,
      plat_no: updatedData.plat_no
    },
    appointment_id: updatedData.appointment_id,
    test_type: updatedData.test_type
  };

  Appointment.findByIdAndUpdate(
    payload.appointment_id,
    { isTimeSlotAvailable: false },
    (err, appointments) => {
      if (err) {
        console.log('Error: ', err);
      }
    }
  );

  User.findOneAndUpdate({ user_id }, payload, (err, data) => {
    if (err) {
      res.render('g_test', { user: {}, updateSuccess: false, err: true });
    } else {
      res.render('g_test', {
        user: {},
        updateSuccess: true,
        err: false,
        date,
        utils: {
          formattedDate
        }
      });
    }
  });
};
