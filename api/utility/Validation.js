const Validator = require('validator');
const isEmpty = require('is-empty');

const MIN_PASS_LENGTH = require('../config/config').minPasswordLength;
const MAX_PASS_LENGTH = require('../config/config').maxPasswordLength;

/**
 * Utility class that is used to validate user input.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class Validation {

    /**
     * Utility method that validates user input from the login form.
     * 
     * @param {object} userData
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static validateLoginInput(userData) {
        let errors = {};

        // Convert empty fields to empty strings for Validator
        userData.email = !isEmpty(userData.email) ? userData.email : '';
        userData.password = !isEmpty(userData.password) ? userData.password : '';

        // Email validation
        if (Validator.isEmpty(userData.email)) {
            errors.email = 'Email field is required';
        } else if (!Validator.isEmail(userData.email)) {
            errors.email = 'Email is invalid';
        }

        // Password validation
        if (Validator.isEmpty(userData.password)) {
            errors.password = 'Password field is required';
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    /**
     * Utility method that validates user input from the registration form.
     * 
     * @param {object} userData 
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static validateRegisterInput(userData) {
        let errors = {};

        // Convert empty fields to empty strings for Validator
        userData.email = !isEmpty(userData.email) ? userData.email : '';
        userData.password = !isEmpty(userData.password) ? userData.password : '';
        userData.firstName = !isEmpty(userData.firstName) ? userData.firstName : '';
        userData.lastName = !isEmpty(userData.lastName) ? userData.lastName : '';
        userData.username = !isEmpty(userData.username) ? userData.username : '';

        // Email validation
        if (Validator.isEmpty(userData.email)) {
            errors.email = 'Email field is required';
        } else if (!Validator.isEmail(userData.email)) {
            errors.email = 'Email is invalid';
        }

        // Password validation
        if (Validator.isEmpty(userData.password)) {
            errors.password = "Password field is required";
        }

        if (Validator.isEmpty(userData.password2)) {
            errors.password2 = "Confirm password field is required";
        }

        if (!Validator.isLength(userData.password, { min: MIN_PASS_LENGTH, max: MAX_PASS_LENGTH })) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!Validator.equals(userData.password, userData.password2)) {
            errors.password2 = "Passwords must match";
        }

        // First name validation
        if (Validator.isEmpty(userData.firstName)) {
            errors.firstName = "First name field is required";
        }

        // Last name validation
        if (Validator.isEmpty(userData.lastName)) {
            errors.lastName = "Last name field is required";
        }

        // Username validation
        if (Validator.isEmpty(userData.username)) {
            errors.username = "Username field is required";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }
}

module.exports = Validation;
