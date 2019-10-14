const carModel = require('../entities/cars/car.model');
const bookingModel = require('../entities/bookingDetails/booking.model')
const date = require('date-and-time');




exports.insert = (req, res) => {
    console.log(req);
    var carToBeBooked;
    var body = req.body;

    carModel.findByModelAndBookingStatus(body.model, false)
        .then((car) => {
            if(!car[0]){
                res.status(404).send("No available car with this model.Please select another model");
            }else{
                carToBeBooked = car[0].vehicleNumber;
                var bookingData = {};
                bookingData.vehicleNumber = car[0].vehicleNumber;
                bookingData.customerfirstName = req.body.firstName;
                bookingData.customerlastName = req.body.lastName;
                bookingData.customerEmail = req.body.email;
                bookingData.customerContact = req.body.contact;
                bookingData.customerAddress = req.body.address;
                bookingData.issueDate = new Date(req.body.issueDate).getTime()/1000;
                bookingData.returnDate = new Date(req.body.returnDate).getTime()/1000;
                bookingModel.book(bookingData)
                        .then((result) => {
                            car[0].bookedStatus = true;
                            carModel.patchCar(carToBeBooked, car[0]).then((result)=>{});
                            res.status(201).send({id: result._id});
                        });
            }
        });
};


exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    bookingModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};