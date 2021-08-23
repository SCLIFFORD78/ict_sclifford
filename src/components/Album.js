import React from "react";
import { Card } from "react-bootstrap";
import _ from "lodash";
import music from "../images/music.jpeg";
import Select from "react-select";
import { addToPlaylist } from "../actions/result";

const Album = ({ album, playlist }) => {

  function add(value, array) {
    const result = []
    for (let index = 0; index < array.length; index++) {
      const uri = array[index].uri;
      result.push(uri)
      
      
    };
    const val = addToPlaylist(value.id, result);
      console.log(val);
    
  };

  const dropList = [];

  if (Object.keys(playlist).length > 0)
    for (let i = 0; i < playlist.items.length; i++) {
      const element = {
        label: playlist.items[i].name,
        id: playlist.items[i].id,
      };
      dropList.push(element);
    }

  return (
    <React.Fragment>
      {Object.keys(album).length > 0 && (
        <div className="album">
          <React.Fragment>
            <Card style={{ width: "25rem" }}>
              <a
                target="_blank"
                href={album.external_urls.spotify}
                rel="noopener noreferrer"
                className="card-image-link"
              >
                {!_.isEmpty(album.images) ? (
                  <Card.Img variant="top" src={album.images[0].url} alt="" />
                ) : (
                  <img src={music} alt="" />
                )}
              </a>
              <Card.Body>
                <p>Type: {album.album_type}</p>
                <Card.Title>Name: {album.name}</Card.Title>
                <Card.Text>
                  <small>
                    Artist:{" "}
                    {album.artists.map((artist) => artist.name).join(", ")} ,
                    {album.total_tracks} Track(s)
                    
                  </small>
                  <p></p>
                  <p>Add Album to Playlist:</p>
                  <div className="col-md-14">
                  <Select
                    options={dropList}
                    onChange={(e) => add(e, album.tracks.items)}
                  ></Select>
                </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </React.Fragment>
        </div>
      )}
    </React.Fragment>
  );
};
export default Album;
