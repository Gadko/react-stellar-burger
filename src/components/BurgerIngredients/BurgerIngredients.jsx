import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";
import { useEffect, useRef } from "react";
import {Element, scrollSpy}  from "react-scroll";
import PropsValidation from "../PropsValidation/PropsValidation";

const IngredientsList = (props) => {
  if (props.data === undefined) {
    return null;
  }
  const arr = [];
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].type === props.type) {
      arr.push(
        <IngredientItem
          key={props.data[i]._id}
          img={props.data[i].image}
          price={props.data[i].price}
          name={props.data[i].name}
          count={props.data[i].count}
          addIngredient={() => {props.setActiveDetails(props.data[i]._id)}}
          _id={props.data[i]._id}
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
              setActiveDetails={props.setActiveDetails}
              data={props.data}
              type="bun"
              addIngredient={props.addIngredient}
            />
          </div>
          </Element>
        <Element name="sauce" id="sauce">
          <h2 className={styles.headtitle}>Соусы</h2>
          <div className={styles.content}>
            <IngredientsList
              setActiveDetails={props.setActiveDetails}
              data={props.data}
              type="sauce"
              addIngredient={props.addIngredient}
            />
          </div>
          </Element>
        <Element name="main" id="main">
          <h2 className={styles.headtitle}>Начинки</h2>
          <div className={styles.content}>
            <IngredientsList
              setActiveDetails={props.setActiveDetails}
              data={props.data}
              type="main"
              addIngredient={props.addIngredient}
            />
          </div>
          </Element>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropsValidation),
};

export default BurgerIngredients;
