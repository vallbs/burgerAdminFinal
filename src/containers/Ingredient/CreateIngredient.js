import React, { Component } from 'react';
import './IngredientDetails.css';
import axios from '../../axios';

import InputControl from '../InputControl/InputControl';
import ButtonControl from '../ButtonControl/ButtonControl';

class CreateIngredient extends Component {
    handleSaveIngredient = (evt) => {
        evt.preventDefault();
        const ingredient = {
            id: this.state.ingredientId,
            name: this.state.ingredientName,
            price: this.state.ingredientPrice
        }

        axios.post("/ingredients.json", ingredient)
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
        this.setState({ingredientName: evt.target.value});
    }

    handlePriceChanges = (evt) => {
        this.setState({ingredientPrice: evt.target.value});
    }

    render() {
        return(
            <div>
                <form 
                    className="IngredientDetailsForm"
                    onSubmit={ evt => this.handleSaveIngredient(evt) }>
                    
                    <ButtonControl
                        classes="ButtonControl ButtonEdit"
                        clicked={ evt => this.handleSaveIngredient(evt) }
                        label="зберегти"
                    />
                    <ButtonControl
                        classes="ButtonControl ButtonCancel"
                        clicked={ evt => this.handleCancelChanges(evt) }
                        label="відмінити"
                    />

                    <div className="IngredientDetailsData">
                        <InputControl 
                            valueChanged={ evt => this.handleNameChanges(evt) }
                            label="Назва"
                            type="text"
                            name="name"
                            value={ this.state.ingredientName || ""}
                        />
                        <InputControl 
                            valueChanged={ evt => this.handlePriceChanges(evt) }
                            label="Ціна"
                            type="number"
                            name="price"
                            value={ this.state.ingredientPrice || 0 }
                        />
                    </div>
                    {/* <input 
                        className="IngredientButton IngredientButtonSave"
                        type="submit" 
                        value="зберегти" />
                    <button
                        className="IngredientButton IngredientButtonCancel"
                        onClick={ evt => this.handleCancelChanges(evt) }
                        >відмінити
                    </button> */}
                </form>
            </div>
        );
    }

    state = {
        ingredientId: null,
        ingredientName: null,
        ingredientPrice: null,
        saving: false
    }
}

export default CreateIngredient;