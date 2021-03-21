import * as types from './../constants/ActionType';
import * as Message from './../constants/Message';
var messageInitialState = Message.MSG_WELCOME;
const message = (state = messageInitialState, action) => {
    switch (action.type) {
        case types.CHANGE_MESSAGE:
            return action.message;
        default: return state;
    }
    
}
export default message;