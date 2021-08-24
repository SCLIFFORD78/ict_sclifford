import React, { useState } from "react";

import { getPlaylist, deleteFromPlaylist } from "../actions/result";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PlaylistAlbumList from "../components/PlaylistAlbumList";
import Loader from "../components/Loader";
import { useEffect } from "react";

var num = 0;

const PlayListAlbumPage = (props) => {
  const { id, removeItem } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("tracks");
  var { isValidSession, history } = props;
  
  


  //Allows prop change to force first render
/*    while (Object.keys(tracks).length === 0 ) {
    setIsLoading(true);
    props.dispatch(getPlaylist(id)).then(() => {
      setIsLoading(false);
      setSelectedCategory("tracks");
    });
  }  */

  useEffect(() => {
    if (isValidSession()) {
      setIsLoading(true);
      getPlaylist(id).then((tracks) => {
        setTracks(tracks)
        setIsLoading(false);

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

  if (Object.keys(tracks).length !== 0 && typeof removeItem !== "undefined") {
    for (var i = 0; i < tracks.items.length; i++) {
      if (tracks.items[i].track.uri === removeItem) {
          if (isValidSession()) {
            deleteFromPlaylist(id, removeItem)
            tracks.items.splice(i,i+1)
            setSelectedCategory("tracks");
          } else {
            history.push({
              pathname: "/",
              state: {
                session_expired: true,
              },
            });
          }
          break;
      }
    }
  }

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  //const { tracks } = props;


  return (
    <React.Fragment>
      {isValidSession() && Object.keys(tracks).length !== 0 && typeof Object.keys(tracks) !== 'undefined' && (
        <div>
          <Loader show={isLoading}>Loading...</Loader>
          <div>
            <h4>Playlist: {tracks.name}</h4>
          </div>
          <PlaylistAlbumList
            tracks={tracks}
            playlistID={id}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
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
  };
};

export default connect(mapStateToProps)(PlayListAlbumPage);
