import React, { Component } from 'react';
import "./Ingredients.css";
import axios from "../../axios";

import ButtonControl from '../ButtonControl/ButtonControl';

class Ingredients extends Component {
    componentDidMount = () => {
        axios.get("/ingredients.json")
            .then(response => {
                const data = response.data;
                let ingredients = Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key
                    };
                });
                ingredients = ingredients.sort( (a,b) => {
                    return a.name !== b.name ? a.name < b.name ? -1 : 1 : 0;
                });
                this.setState({ingredients});
            })
            .catch(error => console.log(error));
    }

    handleCreateIngredient = () => {
        this.props.history.push(this.props.history.location.pathname+"/new");
    }

    handleIngredientDetails = (ingredientId) => {
        this.props.history.push(this.props.history.location.pathname+"/"+ingredientId);
    }

    render () {
        let ingredients = <p>loading...</p>
        if(this.state.ingredients) {
            ingredients = this.state.ingredients.map(ing => {
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
        ingredients: null
    }
};

export default Ingredients;