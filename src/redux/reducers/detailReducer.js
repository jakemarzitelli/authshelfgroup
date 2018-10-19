import { DETAIL_ACTION } from '../actions/detailAction';

const detailReducer = (state = { items: []}, action) => {
    switch (action.type) {
        case DETAIL_ACTION.SET_DETAIL:
            return action.payload;
        default:
            return state
    }
}

export default detailReducer;