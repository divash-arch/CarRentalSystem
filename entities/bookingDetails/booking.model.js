const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
   vehicleNumber: String,
   issueDate: Number,
   returnDate: Number,
   customerfirstName: String,
   customerlastName: String,
   customerEmail: String,
   customerContact: Number,
   customerAddress: String,
   BookingStatus : Boolean
});


const Booking = mongoose.model('Booking', bookingSchema);

exports.book = (bookingData) => {
    const booking = new Booking(bookingData);
    return booking.save();
};



exports.findByVehicleNumber = (vehicleNumber) => {
    return Booking.find({vehicleNumber: vehicleNumber});
};


exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Booking.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, bookings) {
                if (err) {
                    reject(err);
                } else {
                    resolve(bookings);
                }
            })
    });
};