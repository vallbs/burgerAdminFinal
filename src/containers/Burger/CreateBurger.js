import React, { Component } from 'react';
import IngredientControl from '../IngredientControl/IngredientControl';
import InputControl from '../InputControl/InputControl';
import ButtonControl from '../ButtonControl/ButtonControl';

import axios from '../../axios';
import './CreateBurger.css';

class CreateBurger extends Component {
    componentDidMount = () => {
        axios.get("/ingredients.json")
            .then(response => {
                const data = response.data;
                let ingredients = Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key,
                        quantity: 0
                    }
                });
                ingredients = ingredients.sort((a, b) => {
                    return a.name !== b.name ? a.name < b.name ? -1 : 1 : 0;
                });
                this.setState({ ingredients });
            })
            .catch(error => console.log(error));
    }

    handleNameChanges = (evt) => {
        this.setState({ burgerName: evt.target.value });
    }

    handleSaveBurger = evt => {
        evt.preventDefault();
        if (this.state.burgerName && this.state.burgerName.length > 0) {
            let ingredients = this.state.ingredients.filter(ing => {
                return ing.quantity > 0;
            });

            //deleting ingredient price
            ingredients = ingredients.map(ing => {
                return {
                    id: ing.id,
                    name: ing.name,
                    quantity: ing.quantity
                }
            });

            const burger = {
                ingredients,
                name: this.state.burgerName,
                price: this.state.burgerPrice
            }

            axios.post("/burgers.json", burger)
                .then(response => {
                    this.props.history.goBack();
                })
                .catch(error => console.log(error));
        } else {
            alert("назна бургеру має бути не пуста");
        }

    }

    handleCancelChanges = evt => {
        evt.preventDefault();
        this.props.history.goBack();
    }

    handleAddIngredient = (evt, ingredientId, ingredientPrice) => {
        evt.preventDefault();
        const ingredients = this.state.ingredients.map(ing => {
            if (ing.id === ingredientId) {
                return {
                    ...ing,
                    quantity: ing.quantity + 1
                }
            }
            return ing;
        });

        const ingredientsWithQuantity = ingredients.filter(ing => {
            return ing.quantity > 0;
        });

        const ingredientsString = ingredientsWithQuantity.reduce((accum, curValue, index, array) => {
            let endChar = (index === array.length - 1) ? "" : ", ";
            return accum + curValue.name + endChar;
        }, "");

        this.setState({
            ingredients,
            ingredientsString,
            burgerPrice: this.state.burgerPrice + 1 * ingredientPrice
        });
    }

    handleRemoveIngredient = (evt, ingredientId, ingredientPrice) => {
        evt.preventDefault();
        const ingredients = this.state.ingredients.map(ing => {
            if (ing.id === ingredientId) {
                return {
                    ...ing,
                    quantity: ing.quantity - 1
                }
            }
            return ing;
        });

        const ingredientsWithQuantity = ingredients.filter(ing => {
            return ing.quantity > 0;
        });
        const ingredientsString = ingredientsWithQuantity.reduce((accum, curValue, index, array) => {
            let endChar = (index === array.length - 1) ? "" : ", ";
            return accum + curValue.name + endChar;
        }, "");

        this.setState({
            ingredients,
            ingredientsString,
            burgerPrice: this.state.burgerPrice - 1 * ingredientPrice
        });
    }

    render() {
        let ingredients = <p> loading... </p>
        if (this.state.ingredients) {
            ingredients = this.state.ingredients.map(ingredient => {
                    return (
                        <IngredientControl 
                            key = { ingredient.id }
                            ingredient={ingredient}
                            addIngredient={ (evt, ingredientId, ingredientPrice) => 
                                this.handleAddIngredient(evt, ingredient.id, ingredient.price)}
                            removeIngredient={ (evt, ingredientId, ingredientPrice) => 
                                this.handleRemoveIngredient(evt, ingredient.id, ingredient.price) }/>
                    );
            });
        }

        return (
            <div className = "CreateBurger" >
                <form onSubmit = { evt => this.handleSaveBurger(evt) } >
                    <div className = "" >
                        <ButtonControl
                            classes="ButtonControl ButtonSave"
                            clicked={ evt => this.handleSaveBurger(evt) }
                            label="зберегти"
                        />

                        <ButtonControl
                            classes="ButtonControl ButtonCancel"
                            clicked={ evt => this.handleCancelChanges(evt) }
                            label="відмінити"
                        />

                        <InputControl 
                            valueChanged={ evt => this.handleNameChanges(evt) }
                            label="Назва"
                            type="text"
                            name="name"
                        />
                        <p>
                            <span >Ціна: { this.state.burgerPrice } грн</span> 
                        </p >
                        <p>
                            <span>Інгредієнти: { this.state.ingredientsString } </span> 
                        </p >

                        <div className = "" >
                            <hr / >
                            <p> інгредієнти </p> 
                            { ingredients } 
                        </div > 
                    </div> 
                </form>
            </div >
        );
}

state = {
    burgerName: null,
    burgerPrice: 0,
    ingredients: null,
    ingredientsString: "",
    saving: false
}
}

export default CreateBurger;