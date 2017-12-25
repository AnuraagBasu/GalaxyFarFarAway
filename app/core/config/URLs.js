const baseURL = "https://swapi.co/api/";

export const URLs = {
	getPeople: function ( pageNumber ) {
		return baseURL + "people?page=" + pageNumber;
	},

	getPlanetInfo: function ( planetId ) {
		return baseURL + "planets/" + planetId;
	}
};