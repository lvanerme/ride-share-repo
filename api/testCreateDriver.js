const knex = require('knex')({
    client: 'pg',
    connection:{
        host: 'pg.cse.taylor.edu',
        user: 'lance_vanermen',
        password: 'futegiro',
        database: 'lance_vanermen'
    }
});

//Configure objection
objection = require('objection');
const Model = objection.Model;
Model.knex(knex);


//Load model classes
const { Authorization } = require("./models/Authorization");
const { Driver } = require("./models/Driver");
const { Drivers } = require("./models/Drivers");
const { Location } = require("./models/Location");
const { Passenger } = require("./models/Passenger");
const { Ride } = require("./models/Ride");
const { State } = require("./models/State");
const { User } = require("./models/User");
const { Vehicle } = require("./models/Vehicle");
const {VehicleType} = require("./models/VehicleType");


//Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");
const Joi = require('joi');

const server = Hapi.server( {
    host: "localhost",
    port: 3000,
    routes: {
        cors: true,
    }
})
async function init(){

    await server.register(require("blipp"));

    await server.register( {
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true,
        },
    });

    server.route( [
        {
            method: "GET",
            path: "/",
            handler: async (request, h) => {
                const queryUserId = await User.query().select("id",).where("email",request.payload.email)
                return h.response(queryUserId).code(200)
            },
        },

        {
            method: "POST",
            path: "/become-driver",
            handler: async (request, h) => {
                try{
                    console.log(request.payload)
                    const queryUserId = await User.query().select("id","email")
                        .where("email",request.payload.email)
                    if(queryUserId){
                        return h.response(queryUserId).code(200)
                    } else {
                        return Boom.badRequest("invalid Request")
                    }
                } catch (err){
                    return Boom.badRequest(err);
                }
            },
        },

    ]);

    await server.start();
};

init()

// config:{
//     description: "Become Driver",
//         validate: {
//         payload: Joi.object({
//             email: Joi.string().email().required(),
//         }),
//     },
// },
// const isDriver = await queryUserId
//     .$relatedQuery('driver')
//     .where("driver.userId", queryUserId);
//
// if(isDriver){
//     return {
//         ok: false,
//         msge: `Driver already exists with given email`,
//     };
// }

// const newDriver = await Driver.query().insert( {
//     userId: queryUserId,
//     licenseNumber: request.payload.licenseNumber,
//     licenseState: request.payload.licenseState
// });
//
// if(newDriver){
//     return {
//         ok: true,
//         msge: `Created driver with email: '${request.payload.email}'`,
//     };
// } else {
//     return {
//         ok: false,
//         msge: `Couldn't create driver with email '${request.payload.email}'`,
//     };
// }