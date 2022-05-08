const Appointment = require('../model/Appointment');
const { generateAppointmentSlot, formattedDate } = require('../commons/helper');

module.exports = (req, res) => {
    const { date, time } = req.query;

    const payload = {
        Date: date,
        Time: time,
        isTimeSlotAvailable: true
    };

    Appointment.create(payload, (err, appointment) => {
        if (err) {
            console.log('Error: ', err);
        }
        return res.redirect(`/appointment?date=${date}`);
    });
};
