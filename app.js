const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Plane = require("./models/plane");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Plane {
            _id: ID!
            type: String!
            manufacturer: String!
            model: String!
            nationalOrigin: String!
            description: String!
            unitCost: Int!
            status: String!
            propulsion: String!
            engineModel: String!
            enginePower: Int!
            crew: Int!
            maxSeating: Int
            speed: Int!
            serviceCeiling: Int!
            range: Int!
            emptyWeight: Int!
            maxTakeoffWeight: Int!
            maxLandingWeight: Int!
            wingSpan: String!
            wingArea: Int!
            length: String!
            height: String!
            firstFlight: String!
            productionStatus: String!,
            productionRange: String!
            totalProduction: Int!
            variants: String!
            icaoCode: String!
            iataCode: String!
            date: String!
        }

        type User {
          _id: ID!
          email: String!
          password: String
        }

        input PlaneInput {
            type: String!
            manufacturer: String!
            model: String!
            nationalOrigin: String!
            description: String!
            unitCost: Int!
            status: String!
            propulsion: String!
            engineModel: String!
            enginePower: Int!
            crew: Int!
            maxSeating: Int
            speed: Int!
            serviceCeiling: Int!
            range: Int!
            emptyWeight: Int!
            maxTakeoffWeight: Int!
            maxLandingWeight: Int!
            wingSpan: String!
            wingArea: Int!
            length: String!
            height: String!
            firstFlight: String!
            productionStatus: String!,
            productionRange: String!
            totalProduction: Int!
            variants: String!
            icaoCode: String!
            iataCode: String!
            date: String!
        }

        input UserInput {
          email: String!
          password: String!
        }

        type RootQuery {
            planes: [Plane!]!
        }

        type RootMutation {
            createPlane(planeInput: PlaneInput): Plane
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      planes: () => {
        return Plane.find()
          .then(planes => {
            return planes.map(plane => {
              return { ...plane._doc, _id: plane._doc._id.toString() };
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      createPlane: args => {
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
          creator: "5c7c6536e325884c88d1324f"
        });
        let createdPlane;
        return plane
          .save()
          .then(result => {
            createdPlane = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById("5c7c6536e325884c88d1324f");
          })
          .then(user => {
            if (!user) {
              throw new Error("User not found.");
            }
            user.createdPlanes.push(plane);
            return user.save();
          })
          .then(result => {
            return createdPlane;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@aircraft-database-tvc3y.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
