import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, branch, mapProps, renderComponent, withPropsOnChange } from 'recompose';
// import Predictions from '../components/Predictions2';
import LoadingSpinner from '../../core/components/LoadingSpinner';
import { getPrediction, getRoute, getStop, isFetching, isVisible } from '../selectors';
// import * as selector from '../selectors';
import { clearPredictions, loadPredictionsRequest } from '../actions';

import selectedStop from '../../search';
// selectedStop

// console.dir(selectedStop);

const withPredictionsVisible = (Component) => (props) => {
  console.log('#----------------------');
  console.log('withPredictionsVisible');
  console.dir(props);
  console.log('----------------------#');
  return !props.visible
    ? null
    : <Component { ...props } />
}

const withPredictionsNull = (Component) => (props) => {
  console.log('#----------------------');
  console.log('withPredictionsNull');
  console.dir(props);
  console.log('----------------------#');

  if (!props.payload && !props.fetching) {
    if(props.route && props.stop) {
      // fetchData(props.route, props.stop)
      console.log('dispatch');
      // props.dispatch(loadPredictionsRequest(props.route, props.stop))
      // return <LoadingSpinner />
      // console.log('etstsetset');
    }
  }

  return <Component { ...props } />
}

/*const fetchData = (action, route, stop) => {
  console.log('fetch', route, stop)
}*/

const withPredictionsLoading = (Component) => (props) => {
  console.log('#----------------------');
  console.log('withPredictionsLoading');
  console.dir(props);
  console.log('----------------------#');
  return props.fetching
    ? <LoadingSpinner />
    : <Component { ...props } />
}

const withFetchData = (Component) => (props) => {
  /*console.log('#----------------------');
  console.log('withFetchData');
  console.dir(props);
  console.log('----------------------#');*/

  if(!props.fetching && !props.payload) {
    console.log('not fetching, payload null');
  }

  return <Component { ...props } />
  /*return props.fetching
    ? <LoadingSpinner />
    : <Component { ...props } />*/
}



const Predictions = (props) => {
  /*console.log('#----------------------');
  console.log('Predictions');
  console.dir(props);
  console.log('----------------------#');*/
  return (
    <div className="c-predictions">
      <p>predictions2</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    payload: getPrediction(state),
    route: getRoute(state),
    stop: getStop(state),
    visible: isVisible(state),
    fetching: isFetching(state),
  }
}

const withConditionalRenderings = compose(
  connect(mapStateToProps),
  withPredictionsVisible,
  withPredictionsNull,
  withPredictionsLoading,
  // withFetchData
);

export default withConditionalRenderings(Predictions);


/*const spinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(LoadingSpinner) // `Spinner` is a React component
  )

const enhance = spinnerWhileLoading(
  props => {
    // console.log(props)
    // return true
    return false
  }
)

const Predictions = enhance(({ title, author, content }) => {
  console.log(title)
  return (
    <article>
      <p>Predictions2</p>
    </article>
  )
})

export default Predictions*/
