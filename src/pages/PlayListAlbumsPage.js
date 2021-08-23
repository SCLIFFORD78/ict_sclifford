import React, { useState } from 'react';

import {
  getPlaylist
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PlaylistAlbumsList from '../components/PlaylistAlbumsList';
import SearchForm from '../components/SearchForm';
import Loader from '../components/Loader';
import { useEffect } from 'react';

var num = 0;
const PlayListAlbumPage = (props) => {
  const { id } = props.match.params
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('tracks');
  const { isValidSession, history } = props;

/*   //Allows prop change to force first render
  if (Object.keys(tracks).length === 0 && num < 20) {
    num +=1;
    setIsLoading(true);
    //sleep(5000)
      props.dispatch(getPlaylist(id)).then(() => {
        setIsLoading(false);
        setSelectedCategory('tracks');
        
      });
    }  */

  

  useEffect(() => {
    if (isValidSession() ) {
      props.dispatch(getPlaylist(id)).then(() => {
        setIsLoading(false);
        setSelectedCategory('tracks');
        
      });
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

  const { tracks } = props;
  const result =  tracks.tracks ;

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Loader show={isLoading}>Loading...</Loader>
          <div>
            <h4>Playlist: {tracks.name} Albums</h4>
          </div>
          <PlaylistAlbumsList
            tracks={result}

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

    tracks: state.tracks
  };
};

export default connect(mapStateToProps)(PlayListAlbumPage);