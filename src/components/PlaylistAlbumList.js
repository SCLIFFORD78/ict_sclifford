import React from "react";
import { Card } from "react-bootstrap";
import _ from "lodash";
import music from "../images/music.jpeg";
import Button from "@material-ui/core/Button";
import { deleteFromPlaylist } from "../actions/result";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

const PlaylistAlbumList = ({ tracks, playlistID }) => {
  return (
    <div>
      {typeof Object.keys(tracks) !== "undefined" ? (
        <div className="tracks">
          {tracks.items.map((track, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: "18rem" }}>
                  <a
                    target="_blank"
                    href={track.track.external_urls.spotify}
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
                    <Card.Title>{track.track.name}</Card.Title>
                    <Card.Text>
                      <small>{track.track.artists[0].name}</small>
                    </Card.Text>
                    <Link
                      to={`/userplaylistalbum/${playlistID}/${track.track.uri}`}
                    >
                      <Button variant="outlined" size="medium" color="primary">
                        Remove from Playlist...
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
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
    </div>
  );
};
export default PlaylistAlbumList;
