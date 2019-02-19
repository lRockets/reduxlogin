import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessage';

class SignupPage extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  render() {
    return (
      <SignupForm userSignupRequest={ this.props.userSignupRequest }  flashMessage={ this.props.addFlashMessage }/>
    );
  }
}

export default connect(null, { userSignupRequest,addFlashMessage })(SignupPage);