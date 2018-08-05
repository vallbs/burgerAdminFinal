import React from 'react';

const ingredientControl = (props) => {
    console.log(props);
    return (
        <div 
            className = ""
            key = { props.ingredient.id }>
            
            <button 
                className = ""
                onClick={ props.addIngredient }>
            +</button> 
            
            <div className = "" > 
                <span className = "" > { props.ingredient.name }, </span> 
                <span className = "" > { props.ingredient.price }грн </span> 
                <span className = "" > ({ props.ingredient.quantity }) </span> 
            </div>

            <button 
                className = "BurgerIngredientItem--Add"
                onClick={ props.removeIngredient }
                disabled = { props.ingredient.quantity === 0 } >
            -</button> 
        </div>
    );
}

export default ingredientControl;