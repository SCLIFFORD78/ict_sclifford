import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
const Home = (props) => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
    REACT_APP_CLIENT_SECRET
  } = process.env;
  const handleLogin = () => {
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=playlist-modify-public&response_type=token&show_dialog=true`;
  };
  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  return (
    <React.Fragment>
      {isValidSession() ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="login">
          {sessionExpired && (
            <Alert variant="info">Session expired. Please login again.</Alert>
          )}
          <Button variant="info" type="submit" onClick={handleLogin}>
            Login to spotify
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};
export default connect()(Home);
