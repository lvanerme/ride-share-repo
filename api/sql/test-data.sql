INSERT INTO public."State" (abbreviation, name) VALUES ('MI', 'Michigan');
INSERT INTO public."State" (abbreviation, name) VALUES ('CO', 'Colorado');
INSERT INTO public."State" (abbreviation, name) VALUES ('IN', 'Indiana');

INSERT INTO public."Driver" (id, "userId", "liscenseNumber", "liscenseState") VALUES (2, 3, 'abcdefjk', 'MI');
INSERT INTO public."Driver" (id, "userId", "liscenseNumber", "liscenseState") VALUES (3, 1, 'ghjilklj', 'CO');

INSERT INTO public."Authorization" ("driverId", "vehicleId") VALUES (2, 1);

INSERT INTO public."Vehicle" (id, make, model, color, "vehicleTypeId", capacity, mpg, "licenseState", "liscensePlate") VALUES (1, 'Ford', 'Bronco', 'baby blue', 1, 4, 10, 'CO', 'abcdefjgi');

INSERT INTO public."VehicleType" (id, type) VALUES (1, 'Truck');
INSERT INTO public."VehicleType" (id, type) VALUES (2, 'Sedan');

INSERT INTO public."Drivers" ("driverId", "rideId") VALUES (2, 1);

INSERT INTO public."Ride" (id, date, time, distance, "fuelPrice", fee, "vehicleId", "fromLocationId", "toLocationId") VALUES (1, '2022-04-20', '04:30:00', 300, 3.89, 15, 1, 1, 2);

INSERT INTO public."Passenger" ("userId", "rideId") VALUES (1, 1);

INSERT INTO public."Location" (id, name, address, city, state, "zipCode") VALUES (1, 'Home', '1234 Egypt Valley Rd', 'Ada', 'MI', '49301');
INSERT INTO public."Location" (id, name, address, city, state, "zipCode") VALUES (2, 'Taylor University', '236 West Reade Avenue', 'Taylor', 'IN', '49689');

INSERT INTO public."User" (id, "firstName", "lastName", email, password, phone, "isAdmin") VALUES (1, 'Caroline', 'Rudolph', 'caroline@ruldoph.com', 'cr', '6169007890', false);
INSERT INTO public."User" (id, "firstName", "lastName", email, password, phone, "isAdmin") VALUES (2, 'Josh', 'Shinkle', 'Josh@shinkle.com', 'js', '6161234556', false);
INSERT INTO public."User" (id, "firstName", "lastName", email, password, phone, "isAdmin") VALUES (3, 'Lance', 'VanErmen', 'lance@vanermen.com', 'lv', '6161234567', true);
