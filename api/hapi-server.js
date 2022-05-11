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
		{//Search for rides todo
			method: "GET",
			path: "/rides",
			handler: async (request,h) => {
				// const name = request.payload.name
				// const address = request.payload.address
				// const city = request.payload.city
				// const state = request.payload.state
				// const zipCode = request.payload.zipCode
				try{
					const query = await Location.query().withGraphFetched('Ride')
					return h.response(query).code(200)
				} catch {
					return Boom.badImplementation('Bad implementation')
				}
			}
		},

		{//Sign up to become a driver if not already so
			method: "GET",
			path: "/driversignup/{userId}",
			handler: async (request, h) => {
				if(await Driver.query().where('userId', request.params.userId == null)){
					const query = Driver.query().insert()
				}
				return h.response(query).code(200)
			}
		}



	]);

	await server.start();
};

init()

