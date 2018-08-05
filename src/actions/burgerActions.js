import * as actionTypes from './actionTypes';
import axios from '../axios';

export const fetchBurgers = (url) => {
    return dispatch => {
        dispatch(burgersIsLoading(true));

        let burgers = null;

        axios.get(url)
            .then(response => {
                const data = response.data;
                burgers = Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key
                    }
                });

                dispatch(burgersIsLoading(false));
                dispatch(fetchBurgersSuccess(burgers));
            })
            .catch(error => dispatch(burgersHasErrored(true)));
    }
}

export const burgersIsLoading = (bool) => {
    return {
        type: actionTypes.BURGERS_IS_LOADING,
        payload: { isLoading: bool }
    }
}

export const burgersHasErrored = (bool) => {
    return {
        type: actionTypes.BURGERS_HAS_ERRORED,
        payload: { hasErrored: bool }
    }
}

export const fetchBurgersSuccess = (burgers) => {
    return {
        type: actionTypes.FETCH_BURGERS_SUCCESS,
        payload: { burgers }
    }
}

