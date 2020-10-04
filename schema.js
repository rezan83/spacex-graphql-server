const { buildSchema } = require("graphql");
const axios = require("axios");

const schema = buildSchema(`
    
       type LaunchType {
            flight_number: Int
            mission_name: String
            launch_year: String
            launch_success: Boolean
            launch_date_local: String
            rocket: RocketType 
        }

        type RocketType {
            rocket_id: String
            rocket_name: String
            rocket_type: String
        }

        type Query {
            launches: [LaunchType]
            launch(flight_number: Int!): LaunchType
            rockets: [RocketType]
            rocket(id: Int): RocketType
        }
`);

function generateUrl(...args) {
    let url = "https://api.spacexdata.com/v3";
    for (let i in args) {
        url += `/${args[i]}`;
    }
    return url;
}

const rootResolver = {
    launches: () => {
        return axios.get(generateUrl("launches")).then((res) => res.data);
    },
    launch: ({ flight_number }) => {
        return axios
            .get(generateUrl("launches", flight_number))
            .then((res) => res.data);
    },
    rockets: () => {
        return axios.get(generateUrl("rockets")).then((res) => res.data);
    },
    rocket: ({ id }) => {
        return axios
            .get(generateUrl("rockets"))
            .then((res) => res.data)
            .then((data) => data.find((r) => r.id === id));
    },
};

module.exports = { rootResolver, schema };
