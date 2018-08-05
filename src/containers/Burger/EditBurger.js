import React, { Component } from 'react';
import axios from '../../axios';
import './CreateBurger.css';

import IngredientControl from '../IngredientControl/IngredientControl';
import InputControl from '../InputControl/InputControl';
import ButtonControl from '../ButtonControl/ButtonControl';

class EditBurger extends Component {
    componentDidMount = () => {
        const burgerId = this.props.match.params.id;

        //fetching burger data
        axios.get("/burgers/" + burgerId + ".json")
            .then(response => {
                const burger = {
                    ...response.data,
                    id: burgerId
                }

                let ingredients = null;

                //fetching all ingredients
                axios.get("/ingredients.json")
                    .then(response => {
                        let allIngredients = response.data; //all ingredients from admin
                        allIngredients = Object.keys(allIngredients).map(key => {
                            return {
                                ...allIngredients[key],
                                quantity: 0
                            };
                        });

                        const burgerIngredients = burger.ingredients; //burger ingridients

                        //creating ingridients: 
                        //  if exists in burger - take from burger with its quantity
                        //  if doesn't exist - take from all ingridients with quntity 0
                        ingredients = allIngredients.map(ing => {
                            let returnIng = null;
                            let burIng = burgerIngredients.find(element => {
                                return element.id === ing.id
                            });

                            returnIng = burIng || ing;
                            if (!returnIng.hasOwnProperty("price")) {
                                returnIng.price = ing.price;
                            }
                            burIng = null;

                            return returnIng;
                        });

                        const ingredientsString = burgerIngredients.reduce((accum, curValue, index, array) => {
                            let endChar = (index === array.length - 1) ? "" : ", ";
                            return accum + curValue.name + endChar;
                        }, "");

                        this.setState({
                            burgerName: burger.name,
                            burgerPrice: burger.price,
                            ingredients,
                            ingredientsString
                        });
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    handleNameChanges = (evt) => {
        this.setState({ burgerName: evt.target.value });
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
            burgerPrice: this.state.burgerPrice + 1 * ingredientPrice,
            ingredientsString
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
            burgerPrice: this.state.burgerPrice - 1 * ingredientPrice,
            ingredientsString
        });
    }

    handleUpdateBurger = (evt) => {
        evt.preventDefault();
        if(this.state.burgerName.length > 0) {
            const burgerId = this.props.match.params.id;
            let ingredients = this.state.ingredients.filter(ing => {
                return ing.quantity > 0;
            });
            const burger = {
                name: this.state.burgerName,
                price: this.state.burgerPrice,
                ingredients
            }

            axios.put("/burgers/" + burgerId + ".json", burger)
                .then(response => {
                    this.props.history.goBack();
                })
                .catch(error => console.log(error));
        }
        else {
            alert("назна бургеру має бути не пуста")
        }
    }

    handleDeleteBurger = (evt) => {
        evt.preventDefault();
        const burgerId = this.props.match.params.id;
        axios.delete("/burgers/" + burgerId + ".json")
            .then(response => {
                this.props.history.goBack();
            })
            .catch(error => console.log(error));
    }

    handleCancelChanges = (evt) => {
        evt.preventDefault();

        this.props.history.goBack();
    }

    render() {
        let burger = <p> loading... </p>;
        let ingredients = <p> loading... </p>;

        if (this.state.burgerName !== null && this.state.burgerPrice) {
            burger = ( 
                <div>
                    <InputControl 
                            valueChanged={ evt => this.handleNameChanges(evt) }
                            label="Назва"
                            type="text"
                            name="name"
                            value={ this.state.burgerName }
                        />
                    <p>
                        <span>Ціна: { this.state.burgerPrice } грн</span> 
                    </p> 
                    <p>
                        <span > { this.state.ingredientsString } </span> 
                    </p> 
                </div>
            )
        }

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
                <form onSubmit = { evt => this.handleUpdateBurger(evt) }> 
                    <ButtonControl
                        classes="ButtonControl ButtonSave"
                        clicked={ evt => this.handleUpdateBurger(evt) }
                        label="зберегти"
                    />
                    <ButtonControl
                        classes="ButtonControl ButtonDelete"
                        clicked={ evt => this.handleDeleteBurger(evt) }
                        label="видалити"
                    />
                    <ButtonControl
                        classes="ButtonControl ButtonCancel"
                        clicked={ evt => this.handleCancelChanges(evt) }
                        label="назад"
                    />
                    { burger } 

                    {/* <input className = "BurgerButton BurgerButtonSave"
                    type = "submit"
                    value = "зберегти" / >

                    <button className = "BurgerButton BurgerButtonCancel"
                    onClick = { evt => this.handleCancelChanges(evt) } >
                    відмінити </button>  */}
                </form> 
                <hr /> { ingredients } 
            </div>
        );
    }

    state = {
        //burger: null,
        burgerName: null,
        burgerPrice: 0,
        ingredientsString: null,
        ingredients: null,
        saving: false
    }
}

export default EditBurger;