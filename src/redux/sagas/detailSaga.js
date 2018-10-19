import {  takeLatest, put, call } from 'redux-saga/effects';
import { DETAIL_ACTION, setDetails } from '../actions/detailAction';
import axios from 'axios';


function* getDetails(action) {
    
    try {

        console.log(action);
        
        const details = yield call(axios, {
            method: 'GET',
            url: `/api/userDetail/${action.payload}`,
        })
        console.log(details);
        

        yield put (setDetails(details.data[0]));
        
        
    
} catch (error) {
      console.log(error);
    }
}

function* addSaga() {
  yield takeLatest(DETAIL_ACTION.FETCH_DETAIL, getDetails);
}

export default addSaga;
