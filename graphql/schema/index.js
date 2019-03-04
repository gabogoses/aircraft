const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
            creator: User!
        }

        type User {
          _id: ID!
          email: String!
          password: String
          createdPlanes: [Plane!]
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
    `);
