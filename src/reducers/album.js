import { SET_ALBUM, ADD_ALBUM } from '../utils/constants';
const albumReducer = (state = {}, action) => {
  const { album } = action;
  switch (action.type) {
    case SET_ALBUM:
      return album;
    case ADD_ALBUM:
      return {
        ...state,
        album
      };
    default:
      return state;
  }
};
export default albumReducer;
