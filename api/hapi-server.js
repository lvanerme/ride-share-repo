const knex = require('knex')({
	client: 'pg',
	connection: {
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
const { VehicleType } = require("./models/VehicleType");


//Configure Hapi.
const Hapi = require("@hapi/hapi");
const Boom = require("@hapi/boom");
const Joi = require('joi');

const server = Hapi.server({
	host: "localhost",
	port: 3000,
	routes: {
		cors: true,
	}
})
async function init() {

	await server.register(require("blipp"));

	await server.register({
		plugin: require("hapi-pino"),
		options: {
			prettyPrint: true,
		},
	});

	server.route([
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
			method: "GET",
			path: "/sign-up-ride",
			options: {
				description: "Sign up for rides that have not departed and have room"
			},

			handler: async (request, h) => {
				const currentDateTime = new Date()
				const dateOnly = currentDateTime.toJSON().slice(0,10)
				const timeOnly = currentDateTime.toJSON().slice(11,23)

				const allRides = await Ride.query()

				let filteredRides = [];

				for(let i=0; i < allRides.length; i++) {
					const rideDate = allRides[i].date.toJSON().slice(0,10)
					const rideTime = allRides[i].time

					const rideCapacity = await allRides[i]
						.$relatedQuery('Vehicle')
						.select("capacity")
						.first()

					if(rideCapacity.capacity==allRides[i].numRiders) {
						continue
					}

					if(rideDate > dateOnly) {
						filteredRides.push(allRides[i])
					} else if(rideDate === dateOnly) {
						if(rideTime > timeOnly) {
							filteredRides.push(allRides[i])
						}
					}
				}

				for (let i=0; i < filteredRides.length; i++) {

					const toLocation = await filteredRides[i]
						.$relatedQuery('fromRidetoLocation')
						.select('address')
						.where("Location.id", filteredRides[i].toLocationId)
						.first();

					const fromLocation = await filteredRides[i]
						.$relatedQuery('fromRidefromLocation')
						.select('address')
						.where("Location.id", filteredRides[i].fromLocationId)
						.first();

					filteredRides[i].toLocationId = toLocation.address
					filteredRides[i].fromLocationId = fromLocation.address
				}
				if(filteredRides){
					return filteredRides
				} else {
					return {
						ok: false
					};
				}
			}
		},

		// {
		// 	method: "POST",
		// 	path: "/sign-up-ride/{id}",
		// 	option: {
		// 		description: "Sign up for a ride"
		// 	},
		// 	handler: async(request, h) => {
		//
		// 	}
		// },

		{
			method: "POST",
			path: "/become-driver",
			options:{
				description: "Become Driver",
			},
			handler: async (request, h) => {
				//query gets the user for the params passed in
				const queryUser = await User.query()
					.select('id')
					.where("email", request.payload.email)
					.first();
				console.log(queryUser)

				//query checks if that user is already a driver
				const isDriver = await queryUser
					.$relatedQuery('Driver')
					.where("Driver.userId", queryUser.id);

				//if resulting query is not ' ' then they are already a driver, we abort
				if (isDriver != '') {
					return {
						ok: false,
						msge: `Driver already exists with given email`,
					};
				}

				//else we post them as a new driver in the database
				const newDriver = await Driver.query().insert({
					userId: queryUser.id,
					licenseNumber: request.payload.licenseNumber,
					licenseState: request.payload.licenseState
				});

				//we deal with if the request suceeds for posting them to the database
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
		},
		{
			method: "GET",
			path: "/view-driving-rides",
			options: {
				description: "Get all rides that the user is driving for"
			},
			handler: async (request, h) => {
				const currentUser = await User.query()
					.select('id')
					.where("email", request.query.currentAccount)
					.first();

				const currentDriver = await currentUser
					.$relatedQuery('Driver')
					.where('userId', currentUser.id)
					.first()

				const drivingRides = await currentDriver
					.$relatedQuery('Ride')
					.where("Drivers.driverId", currentDriver.id)

				for (let i=0; i < drivingRides.length; i++) {

					const toLocation = await drivingRides[i]
						.$relatedQuery('fromRidetoLocation')
						.select('address')
						.where("Location.id", drivingRides[i].toLocationId)
						.first();

					const fromLocation = await drivingRides[i]
						.$relatedQuery('fromRidefromLocation')
						.select('address')
						.where("Location.id", drivingRides[i].fromLocationId)
						.first();

					drivingRides[i].toLocationId = toLocation.address
					drivingRides[i].fromLocationId = fromLocation.address

				}


				if(drivingRides){
					return drivingRides
				} else {
					return {
						ok: false
					};
				}
			}

		},
		{
			method:"DELETE",
			path:"/unrelate-drivingRides/{id}",
			options: {
				description: "Unrelate driving rides on drivers table"
			},
			handler: async (request,h) => {
				const ride = await Ride.query()
					.select('id')
					.where('id', request.params.id)
					.first()

				const unrelate = await ride.$relatedQuery('Driver')
					.unrelate()
					.where('Drivers.rideId', request.params.id)
				if(unrelate) {
					return {
						ok: true
					};
				} else {
					return {
						ok: false
					};
				}
			}
		},


		{
			method: "GET",
			path: "/view-your-rides",
			options:{
				description: "Get all rides that user is signed up for"
			},
			handler: async (request, h) => {
				const currentUser = await User.query()
					.select('id')
					.where("email", request.query.currentAccount)
					.first();

				const userRides = await currentUser
					.$relatedQuery('Ride')
					.where("Passenger.userId", currentUser.id)

				for (let i=0; i < userRides.length; i++) {

					const toLocation = await userRides[i]
						.$relatedQuery('fromRidetoLocation')
						.select('address')
						.where("Location.id", userRides[i].toLocationId)
						.first();

					const fromLocation = await userRides[i]
						.$relatedQuery('fromRidefromLocation')
						.select('address')
						.where("Location.id", userRides[i].fromLocationId)
						.first();

					userRides[i].toLocationId = toLocation.address
					userRides[i].fromLocationId = fromLocation.address
				}

				if(userRides){
					return userRides
				} else {
					return {
						ok: false
					};
				}
			}
		},

		{
			method:"DELETE",
			path:"/unrelate-rides/{id}",
			options: {
				description: "Unrelate rides on user rides tables"
			},
			handler: async (request,h) => {
				const ride = await Ride.query()
					.select('id')
					.where('id', request.params.id)
					.first()

				const unrelate = await ride.$relatedQuery('User')
					.unrelate()
					.where('Passenger.userId', request.params.id)
				if(unrelate) {
					return {
						ok: true
					};
				} else {
					return {
						ok: false
					};
				}
			}
		},

		{
			method: "GET",
			path: "/search-ride",
			// config:{
			// 	description: "Search for a ride",
			// 	validate: {
			// 		payload: Joi.object({
			// 				location: Joi.string().min(3).required(),
			// 		}),
			// 	},
			// },
			handler: async (request, h) => {

				// return await Location.query();


				const location = await Location.query().select('id')
					.modify(function(queryBuilder){
						if (request.query.name){
							queryBuilder.where('name',request.query.name)
							// console.log("THERE IS A NAME IN THE QUERY")
						}
						if (request.query.address){
							queryBuilder.where('address',request.query.address)
						}
						if (request.query.city){
							queryBuilder.where('city',request.query.city)
						}
						if (request.query.state){
							// console.log("THERE IS A state IN THE QUERY")
							queryBuilder.where('state',request.query.state)
						}
						if (request.query.zipCode){
							queryBuilder.where('zipCode',request.query.zipCode)
						} }).first()

				// console.log(location);

				// console.log(request.query)


				const locRides = await location.$relatedQuery('fromRideLocation')
					.where("Ride.fromLocationId", location.id)

				// console.log(locRides);
				if(locRides){
					return locRides;
				}
				else {
					return {
						ok: false
					}
				}


			},
		},

		{
			method: "GET",
			path: "/admin-Vehicles",
			handler: async (request, h) => {

				if (request.query.isAdmin === "true") {
					const vehicles = await Vehicle.query()
					if(vehicles){
						return vehicles
					} else {
						return {
							ok: false
						};
					}
				} else {
					return{
						ok: false
					};
				}
			}
		},

		{
			method: "GET",
			path: "/admin-Vehicle-Type",
			handler: async (request, h) => {

				if (request.query.isAdmin === "true") {
					const vehicleTypes = await VehicleType.query()
					if(vehicleTypes){
						return vehicleTypes
					} else {
						return {
							ok: false
						};
					}
				} else {
					return{
						ok: false
					};
				}
			}
		},

		{
			method: "GET",
			path: "/admin-Drivers",
			handler: async (request, h) => {

				if (request.query.isAdmin === "true") {
					const drivers = await Driver.query()
					if(drivers){
						return drivers
					} else {
						return {
							ok: false
						};
					}
				} else {
					return{
						ok: false
					};
				}
			}
		},

		{
			method: "GET",
			path: "/admin-Users",
			handler: async (request, h) => {

				if (request.query.isAdmin === "true") {
					const users = await User.query()
					if(users){
						return users
					} else {
						return {
							ok: false
						};
					}
				} else {
					return{
						ok: false
					};
				}
			}
		},

		{
			method: "GET",
			path: "/admin-Locations",
			handler: async (request, h) => {

				if (request.query.isAdmin === "true") {
					const locs = await Location.query()
					if(locs){
						return locs
					} else {
						return {
							ok: false
						};
					}
				} else {
					return{
						ok: false
					};
				}
			}
		},

		{
			method: "GET",
			path: "/admin-Rides",
			handler: async (request, h) => {

				if (request.query.isAdmin === "true") {
					const rides = await Ride.query()
					if(rides){
						return rides
					} else {
						return {
							ok: false
						};
					}
				} else {
					return{
						ok: false
					};
				}
			}
		},


		{
			method: "POST",
			path: "/admin-Vehicles",
			config: {
				description: "Create new vehicle",
			},	

			handler: async (request, h) => {
				// console.log("ASDFASDFASDFASDFASDFASDFA")
				// console.log(request.payload);
				// console.log("ASDFASDFASDFASDFASDFASDFA")

				const existingType = await VehicleType.query()
					.where("id", request.payload.vehicleTypeId)
					.first();
				if (!existingType) {
					return {
						ok: false,
						msge: `Vehicle with '${request.payload.vehicleTypeId}' is not real`,
					};
				} 
				// if (request.query.isAdmin==="true"){
					const newVehicles = await Vehicle.query().insert({
						make: request.payload.make,
						model: request.payload.model,
						color: request.payload.color,
						vehicleTypeId: request.payload.vehicleTypeId,
						capacity: request.payload.capacity,
						mpg: request.payload.mpg,
						licenseState: request.payload.licenseState,
						liscensePlate: request.payload.liscensePlate,
					});
					if (newVehicles) {
						return {
							ok: true,
							msge: `Vehicle create`,
						};
					} else {
						return {
							ok: false,
							msge: `Couldn't create vehicle`,
						};
					}
			}
		
		},

		{
			method: "POST",
			path: "/admin-Vehicle-Type",
			config: {
				description: "Create new vehicle type",
			},	

			handler: async (request, h) => {

				const existingType = await VehicleType.query()
					.where("type", request.payload.type)
					.first();
				if (existingType) {
					return {
						ok: false,
						msge: `Vehicle with '${request.payload.vehicleTypeId}' is not real`,
					};
				} 
				// if (request.query.isAdmin==="true"){
					const newVehicles = await VehicleType.query().insert({
						type: request.payload.type,
					});
					if (newVehicles) {
						return {
							ok: true,
							msge: `Vehicle type created`,
						};
					} else {
						return {
							ok: false,
							msge: `Couldn't create vehicle type`,
						};
					}
			}
		
		},

		{
			method: "POST",
			path: "/admin-Users",
			config: {
				description: "Create new User",
			},	

			handler: async (request, h) => {

				const existingType = await User.query()
					.where("email", request.payload.email)
					.first();
				if (existingType) {
					return {
						ok: false,
						msge: `User with '${request.payload.email}' already exists`,
					};
				} 
				// if (request.query.isAdmin==="true"){
					const newVehicles = await User.query().insert({
						firstName: request.payload.firstName,
						lastName: request.payload.lastName,
						email: request.payload.email,
						phone: request.payload.phone,
						password: request.payload.password,
						isAdmin: request.payload.isAdmin
					});
					if (newVehicles) {
						return {
							ok: true,
							msge: `Vehicle type created`,
						};
					} else {
						return {
							ok: false,
							msge: `Couldn't create vehicle type`,
						};
					}
			}
		
		}

	]);

	await server.start();
}

init()