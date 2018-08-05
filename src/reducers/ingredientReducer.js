import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: [],
    isLoading: false,
    hasErrored: false
}

const ingredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload.ingredients 
            }

        case actionTypes.INGREDIENTS_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }

        case actionTypes.BURGERS_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.payload.INGREDIENTS_HAS_ERRORED
            }
            
        default:
            return state;
    }
}

export default ingredientReducer;