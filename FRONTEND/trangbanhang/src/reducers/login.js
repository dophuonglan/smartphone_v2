import * as types from './../constants/ActionType';
import * as Message from './../constants/Message';
var data = (localStorage.getItem('user'));
const loginInitialState = data ? Message.TITLE_LOGINED : Message.TITLE_LOGIN;
const login = (state = loginInitialState, action) => {
    var { login } = action;
    switch (action.type) {
        case types.CHANGE_TITLE:
            console.log(login);
            return login;
        case types.LOGOUT:
            localStorage.removeItem('user');
            return state;
        default:
            return state;
    }
}

export default login;