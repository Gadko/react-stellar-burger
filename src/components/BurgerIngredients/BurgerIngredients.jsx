import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";
import { useEffect, useRef } from "react";
import {Element, scrollSpy}  from "react-scroll";

const IngredientsList = (props) => {
  if (props.data === undefined) {
    return null;
  }
  const arr = [];
  for (let i = 0; i < props.data.ingredients.length; i++) {
    if (props.data.ingredients[i].type === props.type) {
      arr.push(
        <IngredientItem
          key={props.data.ingredients[i]._id}
          img={props.data.ingredients[i].image}
          price={props.data.ingredients[i].price}
          name={props.data.ingredients[i].name}
          count={props.ingredients.get(props.data.ingredients[i]._id)}
          addIngredient={props.addIngredient}
          _id={props.data.ingredients[i]._id}
        ></IngredientItem>
      );
    }
  }
  return arr.length > 0 ? arr : null;
};

function BurgerIngredients(props) {
  useEffect(()=> {
    scrollSpy.update();
  })

  return (
    <>
      <div id="container" className={`${styles.container} custom-scroll`}>
        <Element name="buns" id="buns">
          <h2 className={styles.headtitle}>Булки</h2>
          <div className={styles.content}>
            <IngredientsList
              data={props.data}
              type="bun"
              addIngredient={props.addIngredient}
              ingredients={props.ingredients}
            />
          </div>
          </Element>
        <Element name="sauce" id="sauce">
          <h2 className={styles.headtitle}>Соусы</h2>
          <div className={styles.content}>
            <IngredientsList
              data={props.data}
              type="sauce"
              addIngredient={props.addIngredient}
              ingredients={props.ingredients}
            />
          </div>
          </Element>
        <Element name="main" id="main">
          <h2 className={styles.headtitle}>Начинки</h2>
          <div className={styles.content}>
            <IngredientsList
              data={props.data}
              type="main"
              addIngredient={props.addIngredient}
              ingredients={props.ingredients}
            />
          </div>
          </Element>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.object.isRequired,
  addIngredient: PropTypes.func.isRequired,
  ingredients: PropTypes.instanceOf(Map).isRequired,
};

export default BurgerIngredients;
