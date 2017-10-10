import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import LoadingSpinner from '../components/LoadingSpinner';

injectTapEventPlugin();

export default class AutoCompleteField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const clearButtonStyle = {
      position: 'absolute',
      margin: '24px -32px 0px',
    };

    const iconStyle = {
      color: '#ccc',
    };

    return (
      <div className="c-auto-complete">
        <AutoComplete
          floatingLabelText={this.props.placeholder}
          dataSource={this.props.dataSource}
          dataSourceConfig={this.props.dataStructure}
          onUpdateInput={this.props.onChange}
          onNewRequest={this.props.onSelect}
          searchText={this.props.input}
          openOnFocus
          fullWidth
          filter={AutoComplete.caseInsensitiveFilter}
          listStyle={{ maxHeight: 200, overflow: 'auto' }}
        />

        <IconButton
          tooltip="Clear"
          onClick={this.props.onClear}
          iconStyle={iconStyle}
          style={clearButtonStyle}
          tooltipPosition={'top-center'}
        >
          <FontIcon className="material-icons" >clear</FontIcon>
        </IconButton>
      </div>
    );
  }
}

AutoCompleteField.propTypes = {
  dataSource: PropTypes.array.isRequired,
  dataStructure: PropTypes.object.isRequired,
  input: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
