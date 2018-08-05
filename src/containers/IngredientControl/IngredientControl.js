import React from 'react';
import './IngredientControl.css';

const ingredientControl = (props) => {
    return (
        <div 
            className = "IngredientControl"
            key = { props.ingredient.id }>
            
            <button 
                className = ""
                onClick={ props.addIngredient }>
            +</button> 
            <span className = "IngredientQuantity" >{ props.ingredient.quantity }</span> 
            <button 
                className = ""
                onClick={ props.removeIngredient }
                disabled = { props.ingredient.quantity === 0 } >
            -</button> 
            
            {/* <div className = "" > 
                <span className = "" > { props.ingredient.name }, </span> 
                <span className = "" > { props.ingredient.price }грн </span> 
                <span className = "" > ({ props.ingredient.quantity }) </span> 
            </div> */}
            <div className = "IngredientNamePrice" > 
                <span className = "" > { props.ingredient.name }, </span> 
                <span className = "" > { props.ingredient.price }грн </span> 
            </div>
        </div>
    );
}

export default ingredientControl;