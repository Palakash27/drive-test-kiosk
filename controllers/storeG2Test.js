const User = require('../model/user');
const { serializeData, moveImage } = require('../commons/helper');
const Appointment = require('../model/Appointment');

module.exports = (req, res) => {
  console.log('req.body: ', req.body);

  const serializedData = serializeData(req.body);

  const userPayload = {
    ...serializedData,
    images: []
  };
  const images = req.files.image;

  if (Array.isArray(images)) {
    images.forEach((image) => {
      moveImage(image, userPayload);
    });
  } else {
    moveImage(images, userPayload);
  }

  Appointment.findByIdAndUpdate(
    userPayload.appointment_id,
    { isTimeSlotAvailable: false },
    (err, appointments) => {
      if (err) {
        console.log('Error: ', err);
      }
    }
  );

  User.findByIdAndUpdate(req.session.userId, userPayload, (err, user) => {
    if (err) {
      console.log(`err: ${err}`);
      res.redirect('/g2_test');
    } else {
      console.log(`user: ${user}`);
      res.redirect('/');
    }
  });
};
