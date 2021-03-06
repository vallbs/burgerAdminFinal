import React from 'react';
import './IngredientControl.css';

const ingredientControl = (props) => {
    return (
        <div 
            className = {props.ingredient.quantity > 0 ? "IngredientControl IngredientAddedControl": "IngredientControl"}
            key = { props.ingredient.id }>
            
            <span className = "IngredientQuantity" >{ props.ingredient.quantity }</span> 

            <button 
                className = "IngredientAddButton"
                onClick={ props.addIngredient }>
            +</button>             
            <button 
                className = "IngredientRemoveButton"
                onClick={ props.removeIngredient }
                disabled = { props.ingredient.quantity === 0 } >
            -</button> 
            
            <div className = "IngredientNamePrice" > 
                <span className = "" > { props.ingredient.name }, </span> 
                <span className = "" > { props.ingredient.price }грн </span> 
            </div>
        </div>
    );
}

export default ingredientControl;