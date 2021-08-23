import React, { useState } from "react";

import {
  createPlaylists,
  initiateGetAllNewReleases,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists,
  getUserPlaylists,
} from "../actions/result";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchResult from "../components/SearchResult";
import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";
import { useEffect } from "react";
import PlayList from "../components/PlayList";
import { Form, Button } from 'react-bootstrap';

const UserPlaylists = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("playlist");
  const { isValidSession, history } = props;
  const [name, setName] = useState(""); // '' is the initial state value
  const [description, setDescription] = useState(""); // '' is the initial state value
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const name = event.target.value;
    setName(name);
  };

  const createNewPlaylist = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      setErrorMsg("");
      setName('')
      createPlaylists(name, description);
      window.location.reload();
    } else {
      setErrorMsg("Please enter a playlist Name");
      
    }
  };


  useEffect(() => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(getUserPlaylists()).then(() => {
        setIsLoading(false);
        setSelectedCategory("playlist");
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

  const { albums, artists, playlist } = props;
  var result = { albums, artists, playlist };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Form onSubmit={createNewPlaylist}>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Create a New Playlist</Form.Label>
              <Form.Control
                type="search"
                name="name"
                value={name}
                placeholder="Add Playlist Name"
                onChange={handleInputChange}
                autoComplete="off"
              />
            </Form.Group>
            <Button variant="info" type="submit">
              Add
            </Button>
          </Form>
          <PlayList playlist={playlist} />
          <div className={`${selectedCategory === "playlist" ? "" : "hide"}`}>
            {playlist && <PlayList playlist={result.playlist} />}
          </div>
        </div>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: {
              session_expired: true,
            },
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
    playlist: state.playlist,
  };
};

export default connect(mapStateToProps)(UserPlaylists);
