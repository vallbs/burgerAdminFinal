import React, {Component} from 'react';

import  './Burgers.css';
import axios from '../../axios';

class Burgers extends Component {
    componentDidMount = () => {
        let burgers = null;
        axios.get("/burgers.json")
            .then(response => {
                const data = response.data;
                burgers = Object.keys(data).map(key => {
                    return {
                        ...data[key],
                        id: key
                    }
                });
                this.setState({ burgers });
            })
            .catch(error => console.log(error));
    }

    handleBurgerDetails = (burgerId) => {
        // <Redirect to={this.props.location.pathname+"/"+burgerId} />
        this.props.history.push(this.props.location.pathname+"/"+burgerId);
    }

    handleCreateBurger = () => {
        //console.log("handleCreateBurger");
        this.props.history.push(this.props.history.location.pathname + "/create");
    }

    render () {
        let burgers = <p>loading...</p>
        if(this.state.burgers) {
            burgers = this.state.burgers.map(burger => {
                return (
                    <li 
                        onClick={burgerId => this.handleBurgerDetails(burger.id)}
                        className="BurgerItem"
                        key={burger.id}>
                        <div >
                            <span className="BurgerItemName">{burger.name}</span>
                            {/* <span>{burger.price} грн</span> */}
                        </div>
                        <div>
                            <p className="BurgerItemIngredients">
                                {burger.ingredients.reduce((accum, curValue, index, array) => {
                                    let endChar = (index === array.length-1) ? "" : ", ";
                                    return accum + curValue.name + endChar;
                                }, "")}
                            </p>
                        </div>
                        <div className="BurgerItemPrice">
                            <span>{burger.price} грн</span>
                        </div>
                    </li>
                );
            });
        }

        // const burgers = this.state.burgers.map(burger => {
        //     return (
        //         <li 
        //             onClick={burgerId => this.handleBurgerDetails(burger.id)}
        //             className="BurgerItem"
        //             key={burger.id}>
        //             <div >
        //                 <span className="BurgerItemName">{burger.name}</span>
        //                 {/* <span>{burger.price} грн</span> */}
        //             </div>
        //             <div>
        //                 <p className="BurgerItemIngredients">
        //                     {burger.ingredients.reduce((accum, curValue, index, array) => {
        //                         let endChar = (index === array.length-1) ? "" : ", ";
        //                         return accum + curValue.name + endChar;
        //                     }, "")}
        //                 </p>
        //             </div>
        //             <div className="BurgerItemPrice">
        //                 <span>{burger.price} грн</span>
        //             </div>
        //         </li>
        //     );
        // });

        return (
            <div className="Burgers">
            {/* // <div> */}
                {/* <h1>Бургери</h1> */}
                <button 
                    className="BurgerCreateButton"
                    onClick={this.handleCreateBurger}
                    >новий бургер
                </button>
                <ul className="BurgersList">{burgers}</ul>
            </div>
        );
    }

    state = {
        burgers: null,
        loading: false
    }

    // state = {
    //     burgers: [
    //         {
    //             id: "b1",
    //             name: "Бургер БІФ",
    //             ingredients: [
    //                 {id: "i1", name: "пшенична булочка", quantity: 1},
    //                 {id: "i6", name: "яловича котлета", quantity: 1},
    //                 {id: "i7", name: "сир чеддер", quantity: 2},
    //                 {id: "i10", name: "томат", quantity: 1},
    //                 {id: "i12", name: "айсберг", quantity: 1},                    
    //                 {id: "i17", name: "соус біф", quantity: 1}
    //             ],
    //             price: 100
    //         },
    //         {
    //             id: "b2",
    //             name: "Чікен Бургер",
    //             ingredients: [
    //                 {id: "i1", name: "пшенична булочка", quantity: 1},
    //                 {id: "i5", name: "куряча котлета", quantity: 1},
    //                 {id: "i7", name: "сир чеддер", quantity: 2},
    //                 {id: "i11", name: "огірок", quantity: 1},
    //                 {id: "i15", name: "соус барбекю", quantity: 1}
    //             ],
    //             price: 97
    //         },
    //         {
    //             id: "b3",
    //             name: "Копчений індіанець",
    //             ingredients: [
    //                 {id: "i2", name: "житня булочка", quantity: 1},
    //                 {id: "i4", name: "індича котлета", quantity: 1},
    //                 {id: "i9", name: "сир сулугуні", quantity: 2},
    //                 {id: "i10", name: "томат", quantity: 1},
    //                 {id: "i14", name: "карамелізована цибуля", quantity: 1},                    
    //                 {id: "i15", name: "соус барбекю", quantity: 1}
    //             ],
    //             price: 106
    //         }
    //     ]
    // }
}

export default Burgers;