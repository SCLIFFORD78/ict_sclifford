import React, { Component } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";

import { getPlaylist } from "../actions/result";
const selectedOption = {};

const PlayListDropDown = ({ playlist }) => {
  const dropList = [];

  for (let i = 0; i < playlist.items.length; i++) {
    const element = {
      label: playlist.items[i].name,
      value: playlist.items[i].uri,
    };
    dropList.push(element);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Select options={dropList}></Select>
          <Button variant="outlined" size="medium" color="primary">
            Add to Playlist ...
          </Button>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};
export default PlayListDropDown;
