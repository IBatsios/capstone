import React from "react";
import GoogleLogin from "react-google-login";
import { authenticate, isAuth } from "../helpers";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const Google = ({ informParent = (f) => f }) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    //     axios({
    //       method: "POST",
    //       url: `${process.env.REACT_APP_API}/google-login`,
    //       data: { idToken: response.tokenId },
    //     })
    //       .then((response) => {
    //         console.log("GOOGLE SIGNIN SUCCESS", response);
    //         // inform parent component
    //         informParent(response);
    //       })
    //       .catch((error) => {
    //         console.log("GOOGLE SIGNIN ERROR", error.response);
    //       });
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={(renderProps) => (
          <Button onClick={Google} disabled={renderProps.disabled}>
            Login with Google
          </Button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
