const path = require('path');

const DEFAULT_VALUE = {
  FIRST_NAME: 'default_first_name',
  LAST_NAME: 'default_last_name',
  ADDRESS: {
    HOUSE_NO: 123,
    STREET_NAME: 'default_street_name',
    CITY: 'default_city',
    PROVINCE: 'default_province',
    POSTAL_CODE: 'default_postal_code'
  },
  CAR_DETAILS: {
    MAKE: 'default_make',
    MODEL: 'default_model',
    YEAR: 1998,
    PLAT_NO: 'default_plat_no'
  },
  LICENSE_NO: 'default'
};

const serializeData = (reqBody) => {
  return {
    first_name: reqBody?.first_name,
    last_name: reqBody?.last_name,
    user_id: reqBody?.user_id,
    dob: reqBody?.dob,
    address: {
      house_no: reqBody?.house_no,
      street_name: reqBody?.street_name,
      city: reqBody?.city,
      province: reqBody?.province,
      postal_code: reqBody?.postal_code
    },
    car_details: {
      make: reqBody?.make,
      model: reqBody?.model,
      year: reqBody?.year,
      plat_no: reqBody?.plat_no
    },
    license_no: reqBody?.license_no,
    images: reqBody?.images,
    appointment_id: reqBody?.appointment_id,
    test_type: reqBody?.test_type,
    comments: reqBody?.comments,
    examiner_feedback: reqBody?.examiner_feedback
  };
};

const deSerializeData = (data) => {
  return {
    first_name: data?.first_name,
    last_name: data?.last_name,
    user_id: data?.user_id,
    dob: data?.dob,
    house_no: data?.address?.house_no,
    street_name: data?.address?.street_name,
    city: data?.address?.city,
    province: data?.address?.province,
    postal_code: data?.address?.postal_code,
    make: data?.car_details?.make,
    model: data?.car_details?.model,
    year: data?.car_details?.year,
    plat_no: data?.car_details?.plat_no,
    license_no: data?.license_no,
    images: data?.images,
    appointment_id: data?.appointment_id,
    test_type: data?.test_type,
    comments: data?.comments,
    examiner_feedback: data?.examiner_feedback
  };
};

const moveImage = (image, array) => {
  const imgName = image.name;
  const imgPath = path.resolve(__dirname, '../public/img', imgName);

  image.mv(imgPath);
  array.images.push(`/img/${imgName}`);
};

const generateAppointmentSlot = (date, startTime, endTime, timeSlot) => {
  const startTimeInMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);

  const endTimeInMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

  const appointments = [];

  for (let i = startTimeInMinutes; i < endTimeInMinutes; i += timeSlot) {
    let time = (i / 60).toFixed(2);
    let timeInHours = ('0' + Math.floor(time)).slice(-2);
    let timeInMinutes = ('0' + Math.round((time - timeInHours) * 60)).slice(-2);
    let timeInString = `${timeInHours}:${timeInMinutes}`;

    appointments.push({
      Date: date,
      Time: timeInString,
      isTimeSlotAvailable: false
    });
  }
  return appointments;
};

const formattedDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
};

module.exports = {
  serializeData,
  deSerializeData,
  moveImage,
  DEFAULT_VALUE,
  generateAppointmentSlot,
  formattedDate
};
