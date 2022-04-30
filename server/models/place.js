var mongoose = require('mongoose');

/**
 * Continent Schema
 */
var ContinentSchema = new mongoose.Schema({
  name: {type: String, default: ''}
});
var Continent = mongoose.model('Continent', ContinentSchema);

/**
 * Country Schema
 */
var CountrySchema = new mongoose.Schema({
  continent_id: {type: String, default: ''},
  name: {type: String, default: ''}
});
var Country = mongoose.model('Country', CountrySchema);

/**
 * State Schema
 */
var StateSchema = new mongoose.Schema({
  country_id: {type: String, default: ''},
  name: {type: String, default: ''}
});
var State = mongoose.model('State', StateSchema);

/**
 * City Schema
 */
var CitySchema = new mongoose.Schema({
  state_id: {type: String, default: ''},
  name: {type: String, default: ''}
});
var City = mongoose.model('City', CitySchema);

module.exports = {
	Continent: Continent,
	Country: Country,
	State: State,
	City: City
};
