import React from "react";
import { Card } from "react-bootstrap";
import _ from "lodash";
import music from "../images/music.jpeg";
const PlaylistAlbumList = ({ tracks }) => {
  return (
    <div>
      {Object.keys(tracks).length > 0 && (
        <div className="tracks">
          {tracks.items.map((track, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: "18rem" }}>
                  <a
                    target="_blank"
                    href={track.track.album.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(track.track.album.images) ? (
                      <Card.Img
                        variant="top"
                        src={track.track.album.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{track.track.album.name}</Card.Title>
                    <Card.Text>
                      <small>{track.track.album.artists[0].name}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default PlaylistAlbumList;
