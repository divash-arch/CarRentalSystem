const carModel = require('../entities/cars/car.model');

exports.insert = (req, res) => {
    console.log(req);
    try{
        carModel.addCar(req.body)
            .then((result) => {
                res.status(201).send({status: "OK"});
        });
    }catch {
        res.status(500).send({errors: err});
    }
};


exports.findAvailableCarByColor = (req, res) => {
    carModel.findByColor(req.params.color, false)
        .then((result) => {
            res.status(200).send(result);
        })
};


exports.findAvailableCarBySeatingCapacity = (req, res) => {
    carModel.findBySeatingCapacity(req.params.seatingCapacity, false)
        .then((result) => {
            res.status(200).send(result);
        })
};


exports.findById = (req, res) => {
    carModel.findById(req.params.carId)
        .then((result) => {
            res.status(200).send(result);
        })
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
    carModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};


exports.removeById = (req, res) => {
    carModel.findById(req.params.carId)
        .then((car) =>
            {
                console.log(car);
                if(!car[0]){
                    res.status(401).send("No car present with given Id");
                }else if(!car[0].bookedStatus){
                    res.status(401).send("Cannot Remove as Car is Currently booked");
                }else{
                    carModel.removeById(req.params.carId)
                        .then((result)=>{
                            res.status(204).send({});
                        });
                }
             });

};