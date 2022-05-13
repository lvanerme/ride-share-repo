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
			handler: (request, h) => h.response("Hello, Hap").code(200),
		},
		{
			method: "POST",
			path: "/signup",
			config: {
				description: "Sign up for an account",
				validate: {
					payload: Joi.object({
						firstName: Joi.string().required(),
						lastName: Joi.string().required(),
						email: Joi.string().email().required(),
						phoneNumber: Joi.string().required(),
						password: Joi.string().required(),
					}),
				},
			},

			handler: async (request, h) => {
				const existingUser = await User.query()
					.where("email", request.payload.email)
					.first();
				if (existingUser) {
					return {
						ok: false,
						msge: `Account with email '${request.payload.email}' is already in use`,
					};
				}

				const newUser = await User.query().insert({
					firstName: request.payload.firstName,
					lastName: request.payload.lastName,
					email: request.payload.email,
					phone: request.payload.phoneNumber,
					password: request.payload.password,
					isAdmin: "false"
				});
				if (newUser) {
					return {
						ok: true,
						msge: `Created account '${request.payload.email}'`,
					};
				} else {
					return {
						ok: false,
						msge: `Couldn't create account with email '${request.payload.email}'`,
					};
				}
			}
		},

		{
			method: "POST",
			path: "/login", //how does this work, path is login but route is sign-in??
			config: {
				description: "Log in",
				validate: {
					payload: Joi.object({
						email: Joi.string().email().required(),
						password: Joi.string().min(1).required(),
					}),
				},
			},
			handler: async (request, h) => {
				const user = await User.query()
					.where("email", request.payload.email)
					.first();
				if (
					user
					//&& (await account.verifyPassword(request.payload.password))
				) {
					return {
						ok: true,
						msge: `Logged in successfully as '${request.payload.email}'`,
						details: {
							id: user.id,
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							phone: user.phone,
							isAdmin: user.isAdmin
						},
					};
				} else {
					return {
						ok: false,
						msge: "Invalid email or password",
					};
				}
			},
		},

		{
			method: "POST",
			path: "/become-driver",
			// config:{
			// 	description: "Become Driver",
			// 	validate: {
			// 		payload: Joi.object({
			// 			email: Joi.string().email().required(),
			// 		}),
			// 	},
			// },

			handler: async (request, h) => {
				const queryUserId = await User.query()
					.select('id')
					.where("email", request.payload.email)
				console.log(queryUserId)
				const isDriver = await queryUserId
					.$relatedQuery('Driver')
					.where("Driver.userId", queryUserId);

				if (isDriver) {
					return {
						ok: false,
						msge: `Driver already exists with given email`,
					};
				}

				const newDriver = await Driver.query().insert({
					userId: queryUserId,
					licenseNumber: request.payload.licenseNumber,
					licenseState: request.payload.licenseState
				});

				if (newDriver) {
					return {
						ok: true,
						msge: `Created driver with email: '${request.payload.email}'`,
					};
				} else {
					return {
						ok: false,
						msge: `Couldn't create driver with email '${request.payload.email}'`,
					};
				}
			}
		}


/*
		{
			method: "GET",
			path: "/search-ride",
			config:{
				description: "Search for a ride",
				validate: {
					payload: Joi.object({
							location: Joi.string().min(3).required(),
					}),
				},
			},
			handler: async (request, h) => {
				const locateRide = await Ride.query()//fix this to seach based on location, need joining
					.where("fromLocationId", request.payload.location)
				if(locateRide){
					return{
						ok: true,
						msge: "Location retrieved successfully",
						results: {
							date: locateRide.date,
							time: locateRide.time
						}
					};
				}
				else{
					return{
						ok: false,
						msge: "Invalid Location",
					};
				}

			},
		},
*/


	]);

	await server.start();
};

init()

