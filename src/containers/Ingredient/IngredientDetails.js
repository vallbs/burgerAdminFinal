import React, { Component } from 'react';
import './IngredientDetails.css';
import axios from '../../axios';

import InputControl from '../InputControl/InputControl';
import ButtonControl from '../ButtonControl/ButtonControl';

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
        if(this.state.ingredient.name.length > 0){
        axios.put("/ingredients/" + this.state.ingredient.id + ".json", this.state.ingredient)
            .then(response => {
                this.props.history.goBack();
            })
            .catch(error => console.log(error));
        }
        else {
            alert("назва має бути не пуста");
        }
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
        if(this.state.ingredient) {
            ingredient = (
                <div className="IngredientDetailsData">
                        <InputControl 
                            valueChanged={ evt => this.handleNameChanges(evt) }
                            label="Назва"
                            type="text"
                            name="name"
                            value={ this.state.ingredient.name }
                        />
                        <InputControl 
                            valueChanged={ evt => this.handlePriceChanges(evt) }
                            label="Ціна"
                            type="number"
                            name="price"
                            value={ this.state.ingredient.price }
                        />
                    </div>
            );
        }
        return(
            <div>
                <form 
                    className="IngredientDetailsForm"
                    onSubmit={ evt => this.handleSaveIngredient(evt) }>
                    <ButtonControl
                        classes="ButtonControl ButtonSave"
                        clicked={ evt => this.handleSaveIngredient(evt) }
                        label="зберегти"
                    />
                    <ButtonControl
                        classes="ButtonControl ButtonDelete"
                        clicked={ evt => this.handleDeleteIngredient(evt) }
                        label="видалити"
                    />
                    <ButtonControl
                        classes="ButtonControl ButtonCancel"
                        clicked={ evt => this.handleCancelChanges(evt) }
                        label="назад"
                    />
                    { ingredient }
                </form>
                {/* {ingredient} */}
            </div>
        );
    }

    state = {
        ingredient: null,
        isloading: false,
        hasErrored: false
    }
}

export default IngredientDetails;