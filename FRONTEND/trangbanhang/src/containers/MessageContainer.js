import React, { Component } from 'react';
import { connect } from 'react-redux';

import Messages from '../components/trangbanhangconponents/Messages';
class MessageContainer extends Component {
    render() {
        var {message} = this.props;
        console.log(message);
        return ( 
                <Messages message = {message} ></Messages>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}

export default connect(mapStateToProps, null)(MessageContainer);