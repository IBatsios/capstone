import React, { useContext } from "react";
import axios from 'axios';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Copyright } from 'layout/Layout';
import { UserContext } from 'data/UserStore';
import { URL } from 'config/user';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Register = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(UserContext);
  const [values, setValues] = React.useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: ''
  });

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleLogin = () => {
    dispatch({
      type: 'register',
      payload: false
    });
  }

  const handleRegister = async () => {
    try {
      const response = await axios({
        withCredentials: true,
        method: 'post',
        url: URL.REGISTER,
        data: {
          email: values.email,
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          password2: values.password2
        }
      });
      dispatch({
        type: 'signIn',
        payload: response.data 
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register for Featurama
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.fistName}
                onChange={handleChange("firstName")}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.lastName}
                onChange={handleChange("lastName")}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.email}
                onChange={handleChange("email")}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.username}
                onChange={handleChange("username")}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.password}
                onChange={handleChange("password")}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.password2}
                onChange={handleChange("password2")}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleRegister}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                onClick={handleLogin}
                component="button"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
