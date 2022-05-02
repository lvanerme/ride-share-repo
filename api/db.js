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


const init = async () => {
	const server = Hapi.server( {
		host: "localhost",
		port: 3000,
	});

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
			handler: (request, h) => h.response("Hello, Hapi").code(200),
		}






	]);
	console.log("Server listening on", server.info.url);
	await server.start();
};

init()

