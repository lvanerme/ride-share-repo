create table "User"
(
    id          serial      not null
        constraint user_pk
            primary key,
    "firstName" varchar(20) not null,
    "lastName"  varchar(40) not null,
    email       varchar(30) not null,
    password    varchar(20) not null,
    phone       varchar(15) not null,
    "isAdmin"   boolean
);

comment on table "User" is 'People who use the application';

alter table "User"
    owner to lance_vanermen;

create table "VehicleType"
(
    id   serial      not null
        constraint "vehilce type_pk"
            primary key,
    type varchar(40) not null
);

comment on table "VehicleType" is 'Type of vehicle registered with ride share';

alter table "VehicleType"
    owner to lance_vanermen;

create table "State"
(
    -- Only integer types can be auto increment
    abbreviation varchar(40) default nextval('"State_id_seq"'::regclass) not null
        constraint state_pk
            primary key,
    name         varchar(40)                                             not null
);

comment on table "State" is 'State for license plate registration';

alter table "State"
    owner to lance_vanermen;

create table "Driver"
(
    id               serial  not null
        constraint driver_pk
            primary key,
    "userId"         integer
        constraint driver_user_id_fk
            references "User",
    "liscenseNumber" varchar not null,
    "liscenseState"  varchar(40)
        constraint driver_state_abbreviation_fk
            references "State"
);

comment on table "Driver" is 'Drivers who participate in the ride share system';

alter table "Driver"
    owner to lance_vanermen;

create table "Vehicle"
(
    id              serial      not null
        constraint vehicle_pk
            primary key,
    make            varchar(40) not null,
    model           varchar(40) not null,
    color           varchar(40) not null,
    "vehicleTypeId" integer
        constraint "vehicle_vehilce type_id_fk"
            references "VehicleType",
    capacity        integer     not null,
    mpg             integer     not null,
    "licenseState"  varchar(40)
        constraint vehicle_state_abbreviation_fk
            references "State",
    "liscensePlate" varchar(40)
);

comment on table "Vehicle" is 'Vehicle registered with Ride share';

alter table "Vehicle"
    owner to lance_vanermen;

create table "Authorization"
(
    "driverId"  integer not null
        constraint authorization_driver_id_fk
            references "Driver",
    "vehicleId" integer not null
        constraint authorization_vehicle_id_fk
            references "Vehicle",
    constraint authorization_pk
        primary key ("driverId", "vehicleId")
);

comment on table "Authorization" is 'Authorization for drivers';

alter table "Authorization"
    owner to lance_vanermen;

create table "Location"
(
    id        serial      not null
        constraint location_pk
            primary key,
    name      varchar(40) not null,
    address   varchar(80) not null,
    city      varchar(40) not null,
    state     varchar(40) not null
        constraint location_state_abbreviation_fk
            references "State",
    "zipCode" varchar(40) not null
);

comment on table "Location" is 'Location for rides to come and go';

alter table "Location"
    owner to lance_vanermen;

create table "Ride"
(
    id               serial           not null
        constraint ride_pk
            primary key,
    date             date             not null,
    time             time             not null,
    distance         double precision not null,
    "fuelPrice"      double precision not null,
    fee              double precision not null,
    "vehicleId"      integer
        constraint ride_vehicle_id_fk
            references "Vehicle",
    "fromLocationId" integer
        constraint ride_location_id_fk
            references "Location",
    "toLocationId"   integer
        constraint ride_location_id_fk_2
            references "Location"
);

comment on table "Ride" is 'Rides for ride share';

alter table "Ride"
    owner to lance_vanermen;

create table "Passenger"
(
    "userId" integer not null
        constraint passenger_user_id_fk
            references "User",
    "rideId" integer not null
        constraint passenger_ride_id_fk
            references "Ride",
    constraint passenger_pk
        primary key ("userId", "rideId")
);

comment on table "Passenger" is 'Passengers for a given ride';

alter table "Passenger"
    owner to lance_vanermen;

create table "Drivers"
(
    "driverId" integer not null
        constraint drivers_driver_id_fk
            references "Driver",
    "rideId"   integer not null
        constraint drivers_ride_id_fk
            references "Ride",
    constraint drivers_pk
        primary key ("driverId", "rideId")
);

comment on table "Drivers" is 'Drivers for ride share';

alter table "Drivers"
    owner to lance_vanermen;


