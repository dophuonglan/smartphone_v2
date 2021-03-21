import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../components/trangbanhangconponents/Title';
import { actChangeTitle} from './../actions/index';
class TitleContainer extends Component {
    render() {
        var {onChangeTitle,login} = this.props;
        return (<Title loginTitle ={login}
            onChangeTitle ={onChangeTitle}
            ></Title>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeTitle :(login) => {
            dispatch(actChangeTitle(login));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (TitleContainer);