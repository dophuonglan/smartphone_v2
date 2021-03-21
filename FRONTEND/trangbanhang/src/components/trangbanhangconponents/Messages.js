import React, { Component } from 'react';

class Messages extends Component {
    render() {
        var {message} = this.props;
        return (
            <div>
                <span className="text-success"> {message}</span>
            </div>
        );
    }
}

export default Messages;