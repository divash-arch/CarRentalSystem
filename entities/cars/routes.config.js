const CarsController = require('../../controllers/car.controller');


exports.routesConfig = function (app) {
    app.post('/cars', [
        CarsController.insert
    ]);
    app.get('/cars',[
        CarsController.list
    ]);

    app.get('/cars/color/:color',[
        CarsController.findAvailableCarByColor
    ]);
    app.get('/cars/seatingCapacity/:seatingCapacity',[
         CarsController.findAvailableCarBySeatingCapacity
    ]);

    app.get('/cars/Id/:carId', [
            CarsController.findById
    ]);
    app.delete('/cars/:carId', [
        CarsController.removeById
    ]);
};