import {hillwalk, hillwalkr} from "../../../test/fixtures.js";
export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$Pw4GIMUrXTqAR0JX1gUHUOAP463Nyhf.cbJDVpCGWwABpbBHmwZJi"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$m50fUH2k.Z4r.Dd4OlBiCOnbkhMlP3rvzKvyFzs/A6TnnbF0uMoS."
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$eOzIFnf7TM6NpTawH7gRnuwmyjwkpE.jKL8Q9XRXWWpgTBt6pC8DG"
    }
  },
  countrys: {
    _model: "Country",
    ireland: {
      title: "Ireland",
      userid: "->users.bart"
    }
  },
  pointofinterests: {
    _model: "Pointofinterest",
    hillwalk: {
      title: "Hillwalk",
      county: "kerry",
      description: "stuff happens here",
      latitude: 2.4234,
      longitude: -3.4564,
      countryid: "->countrys.ireland"
    }
  },
  reviews: {
    _model: "Review",
    hillwalkr: {
      title: "Hillwalkr",
      comment: "tough but fun walk",
      rating: 3,
      countryid: "->countrys.ireland"
    }
  }
};
