import React, { useState } from "react";

import { getALbumTracks, getAlbum, getUserPlaylists } from "../actions/result";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import TrackList from "../components/TrackList";
import Album from "../components/Album";
import Loader from "../components/Loader";
import { useEffect } from "react";


const AlbumTracksPage = (props) => {
  const { id } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("tracks");
  const { isValidSession, history} = props;
  const { tracks, album , playlist} = props;
  const result = { tracks, album, playlist };
  
  useEffect(() => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(getUserPlaylists()).then(() => {
        props.dispatch(getALbumTracks(id)).then(() => {
          setSelectedCategory("tracks");
          props.dispatch(getAlbum(id)).then(() => {
            setIsLoading(false);
            setSelectedCategory("tracks");
          });
        });
      });
      
      
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
    // eslint-disable-next-line
  }, []);

  

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <React.Fragment>
      {isValidSession() && typeof Object.keys(tracks) !== 'undefined' && typeof Object.keys(album) !== 'undefined' && typeof Object.keys(playlist) !== 'undefined' && (
        <div>
          <Loader show={isLoading}>Loading...</Loader>
          <Album album={album}playlist={playlist}></Album>
          <TrackList
            tracks={tracks}
            playlist={playlist}
            setCategory={setCategory}
            isValidSession={isValidSession}
          />
        </div>
      ) }
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    album: state.album,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(AlbumTracksPage);
