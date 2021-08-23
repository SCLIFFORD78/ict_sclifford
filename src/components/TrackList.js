import React, { PureComponent, Fragment } from "react";
import { Card } from "react-bootstrap";
import _ from "lodash";
import music from "../images/music.jpeg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { addToPlaylist } from "../actions/result";

const TrackList = ({ tracks, playlist }) => {
  const dropList = [];

  if (Object.keys(playlist).length > 0)
    for (let i = 0; i < playlist.items.length; i++) {
      const element = {
        label: playlist.items[i].name,
        id: playlist.items[i].id,
      };
      dropList.push(element);
    }

  function add(value, uri) {
    const val = addToPlaylist(value.id, uri);
    console.log(val);
  }

  return (
    <React.Fragment>
      {Object.keys(tracks).length > 0 && Object.keys(playlist).length > 0 && typeof Object.keys(tracks) !== 'undefined' && (
        <div className="tracks">
          <TableContainer component={"div"}>
            <Table aria-label="modules table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h3>No.</h3>
                  </TableCell>
                  <TableCell>
                    <h3>Track</h3>
                  </TableCell>
                  <TableCell>
                    <h3>Artist</h3>
                  </TableCell>
                  <TableCell>
                    <h3>Add to Playlist</h3>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tracks.items.map((track, index) => (
                  <TableRow key={index}>
                    <TableCell>{track.track_number}</TableCell>
                    <TableCell component="th" scope="row">
                      <a href={track.external_urls.spotify}>{track.name}</a>
                    </TableCell>
                    <TableCell>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </TableCell>
                    <div className="col-md-9">
                      <Select
                        options={dropList}
                        onChange={(e) => add(e, track.uri)}
                      ></Select>
                    </div>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </React.Fragment>
  );
};
export default TrackList;
