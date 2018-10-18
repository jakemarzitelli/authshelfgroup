export const TOTAL_ACTION = {
    FETCH_TOTAL: 'FETCH_TOTAL',
    SET_TOTAL: 'SET_TOTAL'
}

export const fetchTotals = () => ({
    type: TOTAL_ACTION.FETCH_TOTAL
  });

export const setTotals = (toSet) => ({
    type: TOTAL_ACTION.SET_TOTAL,
    payload: toSet
  });