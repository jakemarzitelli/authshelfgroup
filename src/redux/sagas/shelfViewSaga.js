import { put, takeLatest, call } from 'redux-saga/effects';
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

  function* shelfViewSaga() {
    yield takeLatest(SHELF_VIEW_ACTIONS.FETCH_ITEMS, fetchItems);
  }

  export default shelfViewSaga; 