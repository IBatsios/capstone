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
        if (req.isAuthenticated() && req.cookies.session) { // Both should be true or false at the same time, but I'm being explicit to be extra careful.
            console.log('Authenticated!');
            return next();
        }
        console.log('No session found for a currently logged in user');
        return res.status(500).send({error: 'Not logged in'});
    }

    /**
     * Middleware that is used to check if a requesting user is an administrator or not.
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {function} next 
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static isAdmin(req, res, next) {
        if (req.user.isAdmin) {
            return next();
        }
        console.log('You must be an admin to use this feature');
        res.redirect('/');
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
