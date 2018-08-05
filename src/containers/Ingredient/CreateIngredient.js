import React, { Component } from 'react';
import './IngredientDetails.css';
import axios from '../../axios';

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

    handleIdChange = (evt) => {
        this.setState({ingredientId: evt.target.value});
    }

    handleNameChange = (evt) => {
        this.setState({ingredientName: evt.target.value});
    }

    handlePriceChange = (evt) => {
        this.setState({ingredientPrice: evt.target.value});
    }

    render() {
        return(
            <div>
                <form 
                    className="IngredientDetailsForm"
                    onSubmit={ evt => this.handleSaveIngredient(evt) }>
                    
                    <div className="IngredientDetailsData">
                        {/* <p>
                            <label>Id: </label>
                            <input 
                                onChange={ evt => this.handleIdChange(evt) }
                                type="text" 
                                name="id"/>
                        </p> */}
                        <p>
                            <label>Назва: </label>
                            <input 
                                onChange={ evt => this.handleNameChange(evt) }
                                type="text" 
                                name="name"/>
                        </p>
                        <p>
                            <label>Ціна: </label>
                            <input
                                onChange={ evt => this.handlePriceChange(evt) } 
                                type="number" 
                                name="price"/>
                        </p>
                    </div>

                    <input 
                        className="IngredientButton IngredientButtonSave"
                        type="submit" 
                        value="зберегти" />
                    <button
                        className="IngredientButton IngredientButtonCancel"
                        onClick={ evt => this.handleCancelChanges(evt) }
                        >відмінити
                    </button>
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