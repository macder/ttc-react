import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LoadingSpinner from '../components/LoadingSpinner';

injectTapEventPlugin();

export default class AutoCompleteField extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      input: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.input) {
      this.setState({
        input: '',
      });
    }
  }

  handleClearClick() {
    this.setState({
      input: '',
    });
    this.props.onClear();
  }

  handleUpdateInput(value) {
    this.setState({
      input: value,
    });
    this.props.onUpdateInput(value);
  }

  render() {
    if (this.props.dataSource.length > 0) {
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
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.props.onSelected}
            searchText={this.state.input}
            openOnFocus
            fullWidth
            filter={AutoComplete.caseInsensitiveFilter}
            listStyle={{ maxHeight: 200, overflow: 'auto' }}
          />

          <IconButton
            tooltip="Clear"
            onClick={this.handleClearClick}
            iconStyle={iconStyle}
            style={clearButtonStyle}
            tooltipPosition={'top-center'}
          >
            <FontIcon className="material-icons" >clear</FontIcon>
          </IconButton>
        </div>
      );
    }

    return (
      <LoadingSpinner />
    );
  }
}

AutoCompleteField.propTypes = {
  dataSource: PropTypes.array.isRequired,
  dataStructure: PropTypes.object.isRequired,
  input: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
