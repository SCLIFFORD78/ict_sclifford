import React, { useState } from 'react';

import {
  initiateGetAllNewReleases,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from '../components/Loader';
import { useEffect } from 'react';
import TopReleases from '../components/TopReleases';

const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const { isValidSession, history } = props;

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

  useEffect(() => {
    if (isValidSession() ) {
      setIsLoading(true);
      props.dispatch(initiateGetAllNewReleases());
      setIsLoading(false)
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    };
    // eslint-disable-next-line
  }, [])




  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Loader show={isLoading}>Loading...</Loader>
          <TopReleases
            result={result}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);