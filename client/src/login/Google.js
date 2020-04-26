import React from "react";
import GoogleLogin from "react-google-login";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { URL } from "config/user";
require("dotenv").config();

const Google = () => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    axios({
      method: "post",
      url: URL.GOOGLE_LOGIN,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log("GOOGLE SIGNIN SUCCESS", response);
        // inform parent component
        // informParent(response);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          fullWidth
          variant="contained"
          color="secondary"
          type="submit"
        >
          <i className="fab fa-google pr-2"></i>
          Login with Google
        </Button>
      )}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default Google;
