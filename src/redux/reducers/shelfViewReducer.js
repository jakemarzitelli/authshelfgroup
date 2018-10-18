import { SHELF_VIEW_ACTIONS } from '../actions/shelfViewActions';

const shelfView = (state = [], action) => {
    switch (action.type) {
        case SHELF_VIEW_ACTIONS.SET_ITEMS:
            return action.payload;
        default:
            return state
    }
}

export default shelfView;