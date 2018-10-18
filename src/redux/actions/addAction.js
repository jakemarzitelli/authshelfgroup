export const ADD_ACTION = {
    ADD_ITEM: 'ADD_ITEM'
}

export const addItem = (toAdd) => ({
    type: ADD_ACTION.ADD_ITEM,
    payload: toAdd
  });