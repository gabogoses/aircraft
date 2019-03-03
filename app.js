const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

const planes = [];

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
            unitCost: String!
            status: String!
            engineModel: String!
            enginePower: String!
            crew: String!
            maxSeating: String
            speed: String!
            serviceCeiling: String!
            range: String!
            emptyWeight: String!
            maxTakeoffWeight: String!
            maxLandingWeight: String!
            wingSpan: String!
            wingArea: String!
            length: String!
            height: String!
            firstFlight: String!
            productionStatus: String!,
            productionRange: String!
            totalProduction: String!
            variants: String!
            icaoCode: String!
            iataCode: String!
            Date: String!
        }

        input PlaneInput {
            type: String!
            manufacturer: String!
            model: String!
            nationalOrigin: String!
            description: String!
            unitCost: String!
            status: String!
            engineModel: String!
            enginePower: String!
            crew: String!
            maxSeating: String
            speed: String!
            serviceCeiling: String!
            range: String!
            emptyWeight: String!
            maxTakeoffWeight: String!
            maxLandingWeight: String!
            wingSpan: String!
            wingArea: String!
            length: String!
            height: String!
            firstFlight: String!
            productionStatus: String!,
            productionRange: String!
            totalProduction: String!
            variants: String!
            icaoCode: String!
            iataCode: String!
            Date: String!
        }

        type RootQuery {
            planes: [Plane!]!
        }

        type RootMutation {
            createPlane(planeInput: PlaneInput): Plane
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      planes: () => {
        return planes;
      },
      createPlane: args => {
        const plane = {
          _id: Math.random().toString(),
          type: args.planeInput.type,
          manufacturer: args.planeInput.manufacturer,
          model: args.planeInput.model,
          nationalOrigin: args.planeInput.nationalOrigin,
          description: args.planeInput.description,
          unitCost: args.planeInput.unitCost,
          status: args.planeInput.status,
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
          date: args.planeInput.date
        };
        planes.push(plane);
        return plane;
      }
    },
    graphiql: true
  })
);

app.listen(3000);
