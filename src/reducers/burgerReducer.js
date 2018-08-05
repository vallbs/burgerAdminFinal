import * as actionTypes from '../actions/actionTypes';

const initialState = {
    burgers: [],
    isLoading: false,
    hasErrored: false
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_BURGERS_SUCCESS:
            return {
                ...state,
                burgers: action.payload.burgers
            }

        case actionTypes.BURGERS_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }

        case actionTypes.BURGERS_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.payload.hasErrored
            }
            
        default:
            return state;
    }
}

export default burgerReducer;