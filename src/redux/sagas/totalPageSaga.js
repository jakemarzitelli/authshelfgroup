import { takeLatest, put, call } from 'redux-saga/effects';
import { DETAIL_ACTION, setDetails } from '../actions/detailAction';
import { TOTAL_ACTION, setTotals } from '../actions/totalAction';
import axios from 'axios';


function* getDetails(action) {

    try {

        console.log(action);

        const details = yield call(axios, {
            method: 'GET',
            url: `/api/userDetail/${action.payload}`,
        })
        console.log(details);


        yield put(setDetails(details.data[0]));



    } catch (error) {
        console.log(error);
    }
}
function* fetchTotals(action) {
    
    try {
        const totals = yield call(axios, {
            method: 'GET',
            url: '/api/total',
        })

        yield put (setTotals(totals.data));
    
} catch (error) {
      console.log(error);
    }
}


function* toalPageSaga() {
    yield takeLatest(DETAIL_ACTION.FETCH_DETAIL, getDetails);
    yield takeLatest(TOTAL_ACTION.FETCH_TOTAL, fetchTotals);
}

export default toalPageSaga;
