import React, { Component } from 'react';
import "./Ingredients.css";
import axios from "../../axios";
import { connect } from 'react-redux';
import * as ingredientActions from '../../actions/ingredientActions';

import ButtonControl from '../ButtonControl/ButtonControl';

class Ingredients extends Component {
    componentDidMount = () => {
        this.props.fetchIngredients("/ingredients.json");
    }

    handleCreateIngredient = () => {
        this.props.history.push(this.props.history.location.pathname+"/new");
    }

    handleIngredientDetails = (ingredientId) => {
        this.props.history.push(this.props.history.location.pathname+"/"+ingredientId);
    }

    render () {
        let ingredients = <p>loading...</p>
        // if(this.state.ingredients) {
        if(this.props.ingredients) {
            // ingredients = this.state.ingredients.map(ing => {
            ingredients = this.props.ingredients.map(ing => {
                return (
                    <li 
                        onClick={ ingredientId => this.handleIngredientDetails(ing.id) }
                        className="IngredientItem"
                        key={ing.id}>
                        <p className="IngredientItemName">{ing.name}</p>
                        <p className="IngredientItemPrice">{ing.price} грн</p>
                    </li>
                );
            });
        }
        return (
            <div className="Ingredients">
                <ButtonControl
                    classes="ButtonControl ButtonNew"
                    clicked={ this.handleCreateIngredient }
                    label="новий інгредієнт"
                />
                <ul className="IngredientsList">
                    {ingredients}
                </ul>                    
            </div>
        );
    }

    state = {
        ingredients: null,
        isLoading: false,
        hasErrored: false
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientReducer.ingredients,
        isLoading: state.ingredientReducer.isLoading,
        hasErrored: state.ingredientReducer.hasErrored,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchIngredients: url => dispatch(ingredientActions.fetchIngredients(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Ingredients);