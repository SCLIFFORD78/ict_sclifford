import React from "react";
import { Card } from "react-bootstrap";
import _ from "lodash";
import music from "../images/music.jpeg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const AlbumsList = ({ albums }) => {
  return (
    <React.Fragment>
      {Object.keys(albums).length > 0 && (
        <div className="albums">
          {albums.items.map((album, index) => {
            return (
              <React.Fragment key={index}>
                <Card style={{ width: "18rem" }}>
                  <a
                    target="_blank"
                    href={album.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(album.images) ? (
                      <Card.Img
                        variant="top"
                        src={album.images[0].url}
                        alt=""
                      />
                    ) : (
                      <img src={music} alt="" />
                    )}
                  </a>
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <Card.Text>
                      <small>
                        {album.artists.map((artist) => artist.name).join(", ")}
                      </small>
                    </Card.Text>
                    <Link to={`/albumTracksPage/${album.id}`}>
                      <Button variant="outlined" size="medium" color="primary">
                        Track list ...
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};
export default AlbumsList;
