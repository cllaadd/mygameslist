import React, { Component } from "react";

import { connect } from "react-redux";

import { MGLMap } from "./mgl.js";

class MGLMapContainer extends Component {
  render() {
    return <MGLMap {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map,
  };
};

export default connect(mapStateToProps)(MGLMapContainer);

// Path: api/frontend/mgl.js
// Compare this snippet from api/frontend/test_slice.js:
// import { createSlice } from '@reduxjs/toolkit';
