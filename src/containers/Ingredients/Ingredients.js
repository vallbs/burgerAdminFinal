import React, { Component } from 'react';
import "./Ingredients.css";

import axios from "../../axios";

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
                        {/* <button>Редагувати</button>
                        <button>Видалити</button> */}
                        {/* <a className="IngredientButton"><i class="fas fa-edit"></i></a>
                        <a className="IngredientButton"><i class="fas fa-trash-alt"></i></a> */}
                    </li>
                );
            });
        }
        return (
            <div className="Ingredients">
                {/* <h1>Ingredients</h1> */}
                <button 
                    className="IngredientCreateButton"
                    onClick={this.handleCreateIngredient}
                    >новий інгредієнт
                </button>
                <ul className="IngredientsList">{ingredients}</ul>                    
            </div>
        );
    }

    state = {
        ingredients: null
    }
    // state = { ingredients: 
    //     [
    //         {id: 'i1', name: "пшенична булочка", price: 20},
    //         {id: "i2", name: "житня булочка", price: 25},
    //         {id: "i3", name: "солодова булочка", price: 25},
    //         {id: "i4", name: "індича котлета", price: 45},
    //         {id: "i5", name: "куряча котлета", price: 30},
    //         {id: "i6", name: "яловича котлета", price: 50},
    //         {id: "i7", name: "сир чеддер", price: 10},
    //         {id: "i8", name: "сир рокфор", price: 15},
    //         {id: "i9", name: "сир сулугуні", price: 10},
    //         {id: "i10", name: "томат", price: 8},
    //         {id: "i11", name: "огірок", price: 5},
    //         {id: "i12", name: "айсберг", price: 8},
    //         {id: "i13", name: "руккола", price: 7},
    //         {id: "i14", name: "карамелізована цибуля", price: 5},
    //         {id: "i15", name: "соус барбекю", price: 10},
    //         {id: "i16'", name: "соус медовий", price: 12},
    //         {id: "i17", name: "соус біф", price: 14}
    //     ]
    // }
};

export default Ingredients;