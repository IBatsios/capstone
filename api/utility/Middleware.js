/**
 * Class that is used as middleware for back-end calls.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class Middleware {
    /**
     * Middleware that is used to check if the current user is logged in.
     * 
     * @param {object} req Routing request.
     * @param {object} res Routing response.
     * @param {function} next  Next code to be run.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
          }
          console.log('You must be logged in to do that!');
          res.redirect('/login');
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static isAdmin(req, res, next) {
        // TODO: check if user is an administrator.
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static isSafe(req, res, next) {
        // TODO: check if provided data (i.e. URL) leads to dangerous or inappropriate content.
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static isAuthor(req, res, next) {
        // TODO: check if logged in user is the author of the content being manipulated.
    }
}

module.exports = Middleware;
