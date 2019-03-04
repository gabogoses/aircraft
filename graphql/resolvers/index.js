const bcrypt = require("bcryptjs");

const Plane = require("../../models/plane");
const User = require("../../models/user");

const planes = async planeIds => {
  try {
    const planes = await Plane.find({ _id: { $in: planeIds } });
    planes.map(plane => {
      return {
        ...plane._doc,
        _id: plane.id,
        date: new Date(plane._doc.date).toISOString(),
        creator: user.bind(this, plane.creator)
      };
    });
    return planes;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdPlanes: planes.bind(this, user._doc.createdPlanes)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  planes: async () => {
    try {
      const planes = await Plane.find();
      return planes.map(plane => {
        return {
          ...plane._doc,
          _id: plane._id,
          date: new Date(plane._doc.date).toISOString(),
          creator: user.bind(this, plane._doc.creator)
        };
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPlane: async args => {
    const plane = new Plane({
      type: args.planeInput.type,
      manufacturer: args.planeInput.manufacturer,
      model: args.planeInput.model,
      nationalOrigin: args.planeInput.nationalOrigin,
      description: args.planeInput.description,
      unitCost: args.planeInput.unitCost,
      status: args.planeInput.status,
      propulsion: args.planeInput.propulsion,
      engineModel: args.planeInput.engineModel,
      enginePower: args.planeInput.enginePower,
      crew: args.planeInput.crew,
      maxSeating: args.planeInput.maxSeating,
      speed: args.planeInput.speed,
      serviceCeiling: args.planeInput.serviceCeiling,
      range: args.planeInput.range,
      emptyWeight: args.planeInput.emptyWeight,
      maxTakeoffWeight: args.planeInput.maxTakeoffWeight,
      maxLandingWeight: args.planeInput.maxLandingWeight,
      wingSpan: args.planeInput.wingSpan,
      wingArea: args.planeInput.wingArea,
      length: args.planeInput.length,
      height: args.planeInput.height,
      firstFlight: args.planeInput.firstFlight,
      productionStatus: args.planeInput.productionStatus,
      productionRange: args.planeInput.productionRange,
      totalProduction: args.planeInput.totalProduction,
      variants: args.planeInput.variants,
      icaoCode: args.planeInput.icaoCode,
      iataCode: args.planeInput.iataCode,
      date: new Date(args.planeInput.date),
      creator: "5c7c76afdc49224f7c5ca004"
    });
    let createdPlane;
    try {
      const result = await plane.save();
      createdPlane = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(plane._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById("5c7c76afdc49224f7c5ca004");

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdPlanes.push(plane);
      await creator.save();
      return createdPlane;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
