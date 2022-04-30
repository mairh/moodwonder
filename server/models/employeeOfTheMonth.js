/**
 * Defining a employeeOfTheMonth Model in mongoose
 */
var mongoose = require('mongoose');

/**
 *employeeOfTheMonth Schema
 */

var employeeOfTheMonthSchema = new mongoose.Schema({
    date: {type: String, default: ''},
    company_id: {type: String, default: ''},
    emp_id: mongoose.Schema.Types.ObjectId,
    emp_details: []
    });

module.exports = mongoose.model('employeeOfTheMonth', employeeOfTheMonthSchema);
