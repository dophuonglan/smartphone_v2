import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Title extends Component {
    render() {
    var {loginTitle} =this.props;
        return (
            <Link to='/login'>{loginTitle}</Link>
        );
    }
}

export default Title;