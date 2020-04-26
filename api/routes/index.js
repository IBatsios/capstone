const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.model");
const Middleware = require("../utility/Middleware");
const Validation = require("../utility/Validation");

const { OAuth2Client } = require("google-auth-library");

/**
 * Home Page for back-end developer testing.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Featurama" });
});

/**
 * Displays the registration form to the user.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get("/register", function (req, res, next) {
  res.render("register");
});

/**
 * Sends data in POST request to register the new user through PassportJS.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post("/register", async function (req, res, next) {
  const { errors, isValid } = Validation.validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
    // console.log(errors);
    // return false;
  }

  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    avatar: req.body.avatar,
    bio: req.body.bio,
    phone: req.body.phone,
    isActive: true,
  });

  // Handles password encryption and adding the user to the DB.
  User.register(newUser, req.body.password, function (err, user) {
    // This is a function from Passport and they have made it difficult to abstract out.
    if (err) {
      console.log(err);
      return false;
    }
    passport.authenticate("local")(req, res, function () {
      // This function isn't easy to abstract out. It may make the most sense to keep it in the route, contrary to the architecture.
      // So the password information isn't passed back to the front-end
      req.user.salt = undefined;
      req.user.hash = undefined;

      res.status(200).json(req.user);
    });
  });
});

/**
 * Displays the login form to the user.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.get("/login", function (req, res, next) {
  res.render("login");
});

/**
 * Authenticates the user using PassportJS.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
router.post("/login", function (req, res, next) {
  const { errors, isValid } = Validation.validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
    // console.log(errors);
    // return false;
  }

  passport.authenticate("local")(req, res, function () {
    // This function isn't easy to abstract out. It may make the most sense to keep it in the route, contrary to the architecture.

    // So the password information isn't passed back to the front-end
    req.user.salt = undefined;
    req.user.hash = undefined;

    // Pass the user id, username, and avatar with the session.
    req.session.user = {
      id: req.user._id,
      username: req.user.username,
      avatar: req.user.avatar,
    };

    res.status(200).json(req.user);
  });
});

/**
 * Logs the user out using PassportJS.
 *
 * @author Christopher Thacker
 * @author Michael McCulloch
 * @since 1.0.0
 */
router.get("/logout", Middleware.isLoggedIn, function (req, res, next) {
  try {
    req.logout();
    // The client requires a JSON response in order to logout
    // properly.
    return res.send({ success: true });
  } catch (err) {
    return res.send({ success: false });
  }
});

/**
 * Lets users use Google API to login
 *
 * @author Ioannis Batsios
 */

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", function (req, res, next) {
  console.log("Did I get here", response);
  exports.googleLogin = (req, res) => {
    const { idToken } = req.body;

    client
      .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
      .then((response) => {
        console.log("GOOGLE LOGIN RESPONSE", response);
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: "7d",
                }
              );
              const { _id, email, name, role } = user;
              return res.json({
                token,
                user: { _id, email, name, role },
              });
            } else {
              let password = email + process.env.JWT_SECRET;
              user = new User({ name, email, password });
              user.save((err, data) => {
                if (err) {
                  console.log("ERROR GOOGLE LOGIN ON USER SAVE", err);
                  return res.status(400).json({
                    error: "User signup failed with google",
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SECRET,
                  { expiresIn: "7d" }
                );
                const { _id, email, name, role } = data;
                return res.json({
                  token,
                  user: { _id, email, name, role },
                });
              });
            }
          });
        } else {
          return res.status(400).json({
            error: "Google login failed. Try again",
          });
        }
      });
  };
});

module.exports = router;
