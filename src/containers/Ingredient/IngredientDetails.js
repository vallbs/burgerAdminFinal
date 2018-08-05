import React, { Component } from 'react';
import './IngredientDetails.css';
import axios from '../../axios';

class IngredientDetails extends Component {
    componentDidMount() {
        let data = null;
        const ingredients = null;
        axios.get("/ingredients.json")
            .then(response => {
                const ingredientId = this.props.match.params.id;
                const data = response.data;

                //fetcihng data from firebase with id-templale 'i10'
                // const ingredients = Object.keys(data).map(key => {
                //     return data[key];
                // });

                //fetcihng data from firebase with firebase id 'LItuAvKa42Bmw9HfU4'
                const ingredients = Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key
                    }
                });
                let ingredient = ingredients.filter(ing => {
                    return ing.id === ingredientId;
                });
                ingredient = ingredient && ingredient[0];
                this.setState({
                    ingredient,
                    loading: false
                });

            })
            .catch(error => console.log("error"));
    }

    handleSaveIngredient = (evt) => {
        evt.preventDefault();
        axios.put("/ingredients/" + this.state.ingredient.id + ".json", this.state.ingredient)
            .then(response => {
                this.props.history.goBack();
            })
            .catch(error => console.log(error));
    }

    handleDeleteIngredient = (evt) => {
        evt.preventDefault();
        axios.delete("/ingredients/" + this.state.ingredient.id + ".json")
            .then(response => {
                this.props.history.goBack();
            })
            .catch(error => console.log(error));
    }

    handleCancelChanges = (evt) => {
        evt.preventDefault();
        this.props.history.goBack();
    }

    handleNameChanges = (evt) => {
        const ingredient = {
                ...this.state.ingredient,
                name: evt.target.value
            }
        this.setState({ ingredient });
    }

    handlePriceChanges = (evt) => {
        const ingredient = {
                ...this.state.ingredient,
                price: evt.target.value
            }
        this.setState({ ingredient });
    }

    render() {
        let ingredient = <p>loading...</p>;
        let ingredientNameInput = <span>loading...</span>;
        let ingredientPriceInput = <span>loading...</span>;
        if(this.state.ingredient) {
            ingredient = (
                <div>
                    <h1>{this.state.ingredient.name}</h1>
                </div>
            );

            ingredientNameInput = (
                <input 
                    onChange={ evt => this.handleNameChanges(evt) }
                    type="text" 
                    name="name" 
                    value={this.state.ingredient.name}/>
            );
            ingredientPriceInput = (
                <input 
                    onChange={ evt => this.handlePriceChanges(evt) }
                    type="number" 
                    name="price" 
                    value={this.state.ingredient.price}/>
            );
        }
        return(
            <div>
                <form 
                    className="IngredientDetailsForm"
                    onSubmit={ evt => this.handleSaveIngredient(evt) }>
                    
                    <div className="IngredientDetailsData">
                        <p>
                            <label>Назва: </label>
                            {ingredientNameInput}
                        </p>
                        <p>
                            <label>Ціна: </label>
                            {ingredientPriceInput}
                        </p>
                    </div>

                    <input 
                        className="IngredientButton IngredientButtonSave"
                        type="submit" 
                        value="зберегти" />
                    <button
                        className="IngredientButton IngredientButtonCancel"
                        onClick={ evt => this.handleDeleteIngredient(evt) }
                        >видалити
                    </button>
                    <button
                        className="IngredientButton IngredientButtonCancel"
                        onClick={ evt => this.handleCancelChanges(evt) }
                        >відмінити
                    </button>
                </form>
                {/* {ingredient} */}
            </div>
        );
    }

    state = {
        ingredient: null,
        loading: false
    }
}

export default IngredientDetails;