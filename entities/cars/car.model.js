const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const carSchema = new Schema({
   vehicleNumber: {
                      type: String,
                      required: true,
                      unique: true,
                      index: true
                    },
   model: String,
   seatingCapacity: Number,
   rentPerDay: Number,
   color: String,
   bookedStatus:{
                    type: Boolean,
                    default: false,
                  }
});

const Car = mongoose.model('Cars', carSchema);
Car.createIndexes();

exports.addCar = (carData) => {
    const car = new Car(carData);
    return car.save();
};

exports.findByModelAndBookingStatus = (model, status) => {
    return Car.find({model: model, bookedStatus : status});
};


exports.findById = (id) => {
      return Car.find({_id: id});
  };

exports.findByVehicleNumber = (vehicleNumber) => {
    return Car.find({vehicleNumber: vehicleNumber});
};

exports.findBySeatingCapacity = (seatingCapacity, status) => {
    if(status == null){
        return Car.find({seatingCapacity: {$gte: seatingCapacity}}) ;
    }else{
        return Car.find({seatingCapacity: {$gte: seatingCapacity}, bookedStatus : status});
    }
};

exports.findByColor = (color, status) => {
    if(status == null){
        return Car.find({color: color});
    }else {
        return Car.find({color: color, bookedStatus : status});
    }
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Car.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, cars) {
                if (err) {
                    reject(err);
                } else {
                    resolve(cars);
                }
            })
    });
};


exports.patchCar = (id, carData) => {
    console.log(carData);
    return new Promise((resolve, reject) => {
        Car.findById(carData._id, function (err, car) {
            if (err) reject(err);
            for (let i in carData) {
                car[i] = carData[i];
            }
            car.save(function (err, updatedCar) {
                if (err) return reject(err);
                resolve(updatedCar);
            });
        });
    })

};

exports.removeById = (carId) => {
    return new Promise((resolve, reject) => {
        Car.remove({_id: carId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
