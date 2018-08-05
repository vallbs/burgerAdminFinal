import React, { Component } from 'react';
import './CreateIngredient.css';
import axios from '../../axios';
import uniqid from 'uniqid';

import InputControl from '../InputControl/InputControl';
import ButtonControl from '../ButtonControl/ButtonControl';

class CreateIngredient extends Component {
    handleSaveIngredient = (evt) => {
        evt.preventDefault();
        if(this.state.ingredientName && this.state.ingredientName.length > 0 &&
           this.state.ingredientPrice && this.state.ingredientPrice.length > 0){
            const ingredient = {
                id: uniqid(),
                name: this.state.ingredientName,
                price: this.state.ingredientPrice
            }
            console.log(ingredient);
            axios.post("/ingredients.json", ingredient)
                .then(response => {
                    this.props.history.goBack();
                })
                .catch(error => console.log(error));
        }
        else {
            alert("назва та ціна мають бути не пустими");
        }
        
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
                            value={ this.state.ingredientPrice }
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