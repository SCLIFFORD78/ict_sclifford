import {
  SET_ALBUMS,
  ADD_ALBUMS,
  SET_ALBUM,
  ADD_ALBUM,
  SET_ARTISTS,
  ADD_ARTISTS,
  SET_PLAYLIST,
  ADD_PLAYLIST,
  SET_TRACKS,
  ADD_TRACKS,
} from "../utils/constants";
import { get, post, DELETE } from "../utils/api";
const {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_URL,
  REACT_APP_USER,
} = process.env;

export const setAlbums = (albums) => ({
  type: SET_ALBUMS,
  albums,
});
export const addAlbums = (albums) => ({
  type: ADD_ALBUMS,
  albums,
});
export const setAlbum = (album) => ({
  type: SET_ALBUM,
  album,
});
export const addAlbum = (album) => ({
  type: ADD_ALBUM,
  album,
});
export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists,
});
export const addArtists = (artists) => ({
  type: ADD_ARTISTS,
  artists,
});
export const setPlayList = (playlists) => ({
  type: SET_PLAYLIST,
  playlists,
});
export const addPlaylist = (playlists) => ({
  type: ADD_PLAYLIST,
  playlists,
});
export const setTracks = (tracks) => ({
  type: SET_TRACKS,
  tracks,
});
export const addTracks = (tracks) => ({
  type: ADD_TRACKS,
  tracks,
});
export const initiateGetResult = (val) => {
  async function call(searchTerm) {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=album,playlist,artist`;
      const result = await get(API_URL);
      console.log(result);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  };
  return call(val);
};
export const initiateGetAllNewReleases = () => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/browse/new-releases?country=IE`;
      const result = await get(API_URL);
      console.log(result);
      const { albums, artists, playlists } = result;

      //dispatch(setArtists(artists));
      return dispatch(setAlbums(albums));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const createPlaylists = (val, val1) => {
  async function call(name, description) {
    try {
      const API_URL = `https://api.spotify.com/v1/users/${REACT_APP_USER}/playlists`;
      const headers = {
        name: name,
        description: description,
        public: true,
      };
      const result = await post(API_URL, headers);
      console.log("New playlist", result);
      getUserPlaylists();
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }
  call(val, val1);
};

export const getUserPlaylists = () => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/users/${REACT_APP_USER}/playlists`;
      const result = await get(API_URL);
      console.log(result);
      return dispatch(setPlayList(result));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getPlaylist = (playListID) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/playlists/${playListID}`;
      const headers = {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      };
      const result = await get(API_URL, headers);
      console.log(result);
      return dispatch(setTracks(result));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const addToPlaylist = (val, val2) => {
  async function call(playListID, tracks) {
    try {
      //const test = []
      //test.push(tracks)
      const API_URL = `https://api.spotify.com/v1/playlists/${playListID}/tracks?uris=${tracks}`;

      const result = await post(API_URL);
      console.log(result);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }
  call(val, val2);
};

export const deleteFromPlaylist = (val, val2) => {
  async function call(playListID, tracks) {
    try {
      //const test = []
      //test.push(tracks)
      const API_URL = `https://api.spotify.com/v1/playlists/${playListID}/tracks`;
      const headers = {
        tracks: [
          {
            uri: tracks,
          },
        ],
      };
      const result = await DELETE(API_URL, headers);
      console.log(result);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }
  call(val, val2);
};

export const getAlbum = (albumID) => {
  return async (dispatch) => {
    try {
      const API_URL = ` https://api.spotify.com/v1/albums/${albumID}`;
      const result = await get(API_URL);
      console.log(result);
      return dispatch(setAlbum(result));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getALbumTracks = (albumID) => {
  return async (dispatch) => {
    try {
      const API_URL = ` https://api.spotify.com/v1/albums/${albumID}/tracks`;
      const result = await get(API_URL);
      console.log(result);
      return dispatch(setTracks(result));
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const initiateLoadMoreAlbums = (albums) => {
   async function call(albums) {
    try {
      console.log("url", albums.next);
      const result = await get(albums.next);
      console.log("categoriess", result);
      albums.items.forEach((item) => {
        result.albums.items.unshift(item);
      });
      return result.albums;
    } catch (error) {
      console.log("error", error);
    }
  };
  return call(albums)

};
export const initiateLoadMoreArtists = (artists) => {
  async function call(artists) {
    try {
      console.log("url", artists.next);
      const result = await get(artists.next);
      console.log("categoriess", result);
      artists.items.forEach(item => {
        result.artists.items.unshift(item)
      });
      return result.artists;
    } catch (error) {
      console.log("error", error);
    }
  };
  return call(artists)
};
export const initiateLoadMorePlaylist = (playlists) => {
  async function call(playlists) {
    try {
      console.log("url", playlists.next);
      const result = await get(playlists.next);
      console.log("categoriess", result);
      playlists.items.forEach(item => {
        result.playlists.items.unshift(item)
      });
      return result.playlists;
    } catch (error) {
      console.log("error", error);
    }
  };
  return call(playlists);
};
