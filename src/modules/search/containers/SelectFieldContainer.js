import PropTypes from 'prop-types';
import React from 'react';
import SelectField from '../components/SelectField';

export default class SelectFieldContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      input: null,
    };
  }

  componentWillUpdate(){
    if (!this.props.isVisible) {
      this.setState({
        input: ''
      });
    }
  }

  handleClear() {
    this.props.onClear();
    this.setState({
      input: ''
    });
  }

  handleUpdateInput(input) {
    this.setState({ input });
    if(input === ''){
      this.props.onClear();
    }
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return (
      <SelectField
        data={this.props.data}
        placeholder={this.props.placeholder}
        onSelect={this.props.onSelect}
        onClear={this.handleClear}
        onUpdateInput={this.handleUpdateInput}
        input={this.state.input}
      />
    );
  }
}

SelectFieldContainer.propTypes = {
  data: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
