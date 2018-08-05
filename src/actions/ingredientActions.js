import * as actionTypes from './actionTypes';
import axios from '../axios';

export const fetchIngredients = (url) => {
    return dispatch => {
        dispatch(ingredientsIsLoading(true));

        let ingredients = null;

        axios.get(url)
            .then(response => {
                const data = response.data;
                ingredients = Object.keys(data).map(key => {
                    return {
                        // ...data[key],
                        // id: key
                        ...data[key]
                    }
                });

                dispatch(ingredientsIsLoading(false));
                dispatch(fetchIngredientsSuccess(ingredients));
            })
            .catch(error => dispatch(ingredientsHasErrored(true)));
    }
}

export const ingredientsIsLoading = (bool) => {
    return {
        type: actionTypes.INGREDIENTS_IS_LOADING,
        payload: { isLoading: bool }
    }
}

export const ingredientsHasErrored = (bool) => {
    return {
        type: actionTypes.INGREDIENTS_HAS_ERRORED,
        payload: { hasErrored: bool }
    }
}

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        payload: { ingredients }
    }
}