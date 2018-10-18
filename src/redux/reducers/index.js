import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import shelfView from './shelfViewReducer';

//Lets make a bigger object for our store, with the objects from our reducers.
//This is why we get this.props.reduxStore.user.isLoading
const store = combineReducers({
  shelfView,
  user,
  login,
});

export default store;
