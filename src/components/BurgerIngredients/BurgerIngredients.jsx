import React from 'react';
import data from '../../utils/data';
import styles from './BurgerIngredients.module.css';
import IngredientItem from '../IngredientItem/IngredientItem';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BunIngredients = (props) => {
    const buns = [];
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].type === 'bun') {
            buns.push(
                <IngredientItem
                    key={data.data[i]._id}
                    img={data.data[i].image} 
                    price={data.data[i].price} 
                    name={data.data[i].name} 
                    count={props.ingredients.get(data.data[i]._id)}
                    addIngredient={props.addIngredient}
                    _id={data.data[i]._id}
                >
                </IngredientItem>
            );
        }
    }
    return buns.length > 0 ? buns : null;
};

const SauceIngredients = (props) => {
    const sauces = [];
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].type === 'sauce') {
            sauces.push(
                <IngredientItem
                    key={data.data[i]._id}
                    img={data.data[i].image} 
                    price={data.data[i].price} 
                    name={data.data[i].name}
                    count={props.ingredients.get(data.data[i]._id)} 
                    addIngredient={props.addIngredient}
                    _id={data.data[i]._id}
                />
            );
        }
    }
    return sauces.length > 0 ? sauces : null;
};

const MainIngredients = (props) => {
    const mains = [];
    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].type === 'main') {
            mains.push(
                <IngredientItem
                    key={data.data[i]._id}
                    img={data.data[i].image} 
                    price={data.data[i].price} 
                    name={data.data[i].name} 
                    count={props.ingredients.get(data.data[i]._id)}
                    addIngredient={props.addIngredient}
                    _id={data.data[i]._id}
                />
            );
        }
    }
    return mains.length > 0 ? mains : null;
};

function BurgerIngredients(props) {
    
    return (
        <>
            <div className={`${styles.container} custom-scroll`}>
                <h2 className={styles.headtitle}>Булки</h2>
                <div className={styles.content}>
                    <BunIngredients  addIngredient={props.addIngredient} ingredients={props.ingredients} />
                </div>
                <h2 className={styles.headtitle}>Соусы</h2>
                <div className={styles.content}>
                    <SauceIngredients addIngredient={props.addIngredient} ingredients={props.ingredients} />
                </div>
                <h2 className={styles.headtitle}>Начинки</h2>
                <div className={styles.content}>
                    <MainIngredients addIngredient={props.addIngredient} ingredients={props.ingredients} />
                </div>
            </div>
        </>
    )
}

export default BurgerIngredients;