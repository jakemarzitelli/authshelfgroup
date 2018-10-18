import { put, takeEvery, call } from 'redux-saga/effects';
import { SHELF_VIEW_ACTIONS, setItems } from '../actions/shelfViewActions';
import axios from 'axios'


function* fetchItems() {
    try {
      const items = yield call(
          axios.get, '/api/shelf'
      );
      yield put(
        setItems(items.data)
      );
    } catch (error) {
      // sets that the async request is finished
      console.log(error);
    }
  }

  function* deleteItem(action) {
    try {
      yield call(
        axios.delete, `/api/shelf/${action.payload.id}`);
      yield put(
        {type: SHELF_VIEW_ACTIONS.FETCH_ITEMS}
      );
    } catch (error) {
      console.log(error);
    }
  }

  function* editItem(action) {
    try{
      yield call(
        axios.put, `/api/shelf`, action.payload
      )
      console.log('in editItem in shelfViewSaga, action.payload:', action.payload);
      yield put(
        {type: SHELF_VIEW_ACTIONS.FETCH_ITEMS}
      )
    } 
    catch (error) {
      console.log(error); 
    }
  }

  function* shelfViewSaga() {
    yield takeEvery(SHELF_VIEW_ACTIONS.FETCH_ITEMS, fetchItems);
    yield takeEvery(SHELF_VIEW_ACTIONS.DELETE_ITEM, deleteItem);
    yield takeEvery(SHELF_VIEW_ACTIONS.EDIT_ITEM, editItem)
  }

  export default shelfViewSaga; 