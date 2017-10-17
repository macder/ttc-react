import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapContainer from '../../core/containers/GoogleMapContainer';

const VehicleLocation = props => (
  <div className="c-vehicle-location">
    <GoogleMapContainer />
  </div>
);

VehicleLocation.propTypes = {
};

export default (VehicleLocation);