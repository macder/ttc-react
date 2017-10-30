import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react'

import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/icon.min.css';

const ErrorMessage = ({ error }) => (
  <div className="c-error-message">
    <Message error icon>
      <Icon name='warning circle' />
      <Message.Content>
        <Message.Header>Error, please try again</Message.Header>
        <p>{error.message}</p>
      </Message.Content>
    </Message>
  </div>
);

export default (ErrorMessage);
