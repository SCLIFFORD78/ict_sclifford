import React, { useState } from "react";

import {
  initiateGetResult,
  initiateGetAllNewReleases,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists,
} from "../actions/result";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchResult from "../components/SearchResult";
import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";
import { useEffect } from "react";

const SearchPage = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("albums");
  const { isValidSession, history } = props;
  const [albums, setSearchAlbums] = useState({});
  const [artists, setSearchArtists] = useState({});
  const [playlists, setSearchPlaylists] = useState({});
  const [result, setSearchResult] = useState({ albums, artists, playlists });

  //const { albums, artists, playlist } = props;
  //const result = { albums, artists, playlist };

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      initiateGetResult(searchTerm).then((response) => {
        setSearchAlbums(response.albums);
        setSearchArtists(response.artists);
        setSearchPlaylists(response.playlists);
        setSearchResult({ albums, artists, playlists });
        setIsLoading(false);
        setSelectedCategory("albums");
      });
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      setIsLoading(true);
      switch (type) {
        case "albums":
          setIsLoading(true);
          initiateLoadMoreAlbums(albums).then(nextAlbums => {
            setSearchAlbums(nextAlbums);
            setSearchResult({ albums, artists, playlists });
            setIsLoading(false);
          });
          break;
        case "artists":
          setIsLoading(true);
          initiateLoadMoreArtists(artists).then(nextArtists => {
            setSearchArtists(nextArtists);
            setSearchResult({ albums, artists, playlists });
            setIsLoading(false);
          });
          break;
        case "playlist":
          setIsLoading(true);
          initiateLoadMorePlaylist(playlists).then(nextPlaylists => {
            setSearchPlaylists(nextPlaylists);
            setSearchResult({ albums, artists, playlists });
            setIsLoading(false);
          });
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <SearchForm handleSearch={handleSearch} />
          <Loader show={isLoading}>Loading...</Loader>
          <SearchResult
            result={result}
            loadMore={loadMore}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
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

export default SearchPage;
