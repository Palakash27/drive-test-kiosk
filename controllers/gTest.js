const { deSerializeData, DEFAULT_VALUE, formattedDate } = require('../commons/helper');
const Appointment = require('../model/Appointment');
const User = require('../model/User');

module.exports = (req, res) => {
    let { date } = req.query;

    if (!date) {
        date = formattedDate(new Date());
        return res.redirect(`/g_test?date=${date}`);
    }

    User.findById(req.session.userId, (err, data) => {
        if (err) {
            res.render('g_test', { user: {}, updateSuccess: false, err: true });
        } else if (data) {
            const deSerializedUser = deSerializeData(data);

            const isAppointmentBooked = !!deSerializedUser.appointment_id;

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

                    deSerializedUser.license_no === DEFAULT_VALUE.LICENSE_NO
                        ? res.redirect('g2_test')
                        : res.render('g_test', {
                              user: deSerializedUser,
                              updateSuccess: false,
                              err: false,
                              appointments: filteredAppointments,
                              date,
                              utils: { formattedDate }
                          });
                }
            );
        } else {
            res.redirect('g2_test?error=true');
        }
    });
};
