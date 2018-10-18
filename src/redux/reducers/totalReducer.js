import { TOTAL_ACTION } from '../actions/totalAction';

const totalReducer = (state = [], action) => {
    switch (action.type) {
        case TOTAL_ACTION.SET_TOTAL:
            return action.payload;
        default:
            return state
    }
}

export default totalReducer;