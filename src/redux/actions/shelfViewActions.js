

export const SHELF_VIEW_ACTIONS = {
    FETCH_ITEMS: 'FETCH_ITEMS',
    SET_ITEMS: 'SET_ITEMS',
}

export const setItems = (items) => {
    return {type: SHELF_VIEW_ACTIONS.SET_ITEMS, payload: items}
}