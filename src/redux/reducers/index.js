import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import shelfView from './shelfViewReducer';
import totalReducer from './totalReducer';
import detailReducer from './detailReducer';

//Lets make a bigger object for our store, with the objects from our reducers.
//This is why we get this.props.reduxStore.user.isLoading
const store = combineReducers({
  shelfView,
  user,
  login,
  totalReducer,
  detailReducer
});

export default store;
