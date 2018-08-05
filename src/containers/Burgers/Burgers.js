import React, {Component} from 'react';
import  './Burgers.css';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as burgerActions from '../../actions/burgerActions';

import ButtonControl from '../ButtonControl/ButtonControl';

class Burgers extends Component {
    componentDidMount = () => {
        //dispatching fetching burgers to burgerActions
        this.props.fetchBurgers("/burgers.json");
    }

    handleBurgerDetails = (burgerId) => {
        // this.props.history.push(this.props.location.pathname+"/"+burgerId);
        this.props.history.push(this.props.location.pathname + "/" + burgerId + "/edit");
    }

    handleCreateBurger = () => {
        this.props.history.push(this.props.history.location.pathname + "/create");
    }

    render () {
        let burgers = <p>loading...</p>
        //if(this.state.burgers) {
        if(this.props.burgers) {
            // burgers = this.state.burgers.map(burger => {
            burgers = this.props.burgers.map(burger => {
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

        return (
            <div className="Burgers">
                <ButtonControl
                    classes="ButtonControl ButtonNew"
                    clicked={ this.handleCreateBurger }
                    label="новий бургер"
                />
                <ul className="BurgersList">{burgers}</ul>
            </div>
        );
    }

    state = {
        burgers: null,
        loading: false,
        hasErrored: false
    }
}

const mapStateToProps = state => {
    return {
        burgers: state.burgerReducer.burgers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBurgers: url => dispatch(burgerActions.fetchBurgers(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Burgers);