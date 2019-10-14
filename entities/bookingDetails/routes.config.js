const BookingController = require('../../controllers/booking.controller');


exports.routesConfig = function (app) {
    app.post('/bookCar', [
        BookingController.insert
    ]);

    app.get('/bookings', [
            BookingController.list
        ]);
};