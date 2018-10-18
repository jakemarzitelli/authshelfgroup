import {  takeLatest } from 'redux-saga/effects';
import { ADD_ACTION } from '../actions/addAction';
import axios from 'axios';

function* addItem(action) {
    
    try {
        yield 
    axios({
        method: 'POST',
        url: '/api/shelf',
        data: action.payload
    }).then((results) => {
          
    }).catch(error => {
        console.log('error posting', error);
    })
    
} catch (error) {
      console.log(error);
    }
}

function* addSaga() {
  yield takeLatest(ADD_ACTION.ADD_ITEM, addItem);
}

export default addSaga;
