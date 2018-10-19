export const DETAIL_ACTION = {
    FETCH_DETAIL: 'FETCH_DETAIL',
    SET_DETAIL: 'SET_DETAIL'
}

export const fetchDetails = (toGet) => ({
    type: DETAIL_ACTION.FETCH_DETAIL,
    payload: toGet
  });

export const setDetails = (toSet) => ({
    type: DETAIL_ACTION.SET_DETAIL,
    payload: toSet
  });