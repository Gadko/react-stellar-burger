// import PropTypes from "prop-types";
import styles from "./BurgerIngredients.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";
import { useEffect, useContext } from "react";
import { Element, scrollSpy } from "react-scroll";
import { ModalContext } from "../../service/appContext";

const IngredientsList = (props) => {
  const value = useContext(ModalContext);

  
  if (value.api.ingredients === undefined) {
    return null;
  }
  const arr = [];
  for (let i = 0; i < value.api.ingredients.length; i++) {
    if (value.api.ingredients[i].type === props.type) {
      arr.push(
        <IngredientItem
          key={value.api.ingredients[i]._id}
          img={value.api.ingredients[i].image}
          price={value.api.ingredients[i].price}
          name={value.api.ingredients[i].name}
          count={value.api.ingredients[i].count}
          addIngredient={() => {
            value.modalDetails(value.api.ingredients[i]._id);
          }}
          _id={value.api.ingredients[i]._id}
        ></IngredientItem>
      );
    }
  }
  return arr.length > 0 ? arr : null;
};

function BurgerIngredients(props) {
  useEffect(() => {
    scrollSpy.update();
  });
  return (
    <>
      <div id="container" className={`${styles.container} custom-scroll`}>
        <Element name="buns" id="buns">
          <h2 className={styles.headtitle}>Булки</h2>
          <div className={styles.content}>
            <IngredientsList type="bun" />
          </div>
        </Element>
        <Element name="sauce" id="sauce">
          <h2 className={styles.headtitle}>Соусы</h2>
          <div className={styles.content}>
            <IngredientsList type="sauce" />
          </div>
        </Element>
        <Element name="main" id="main">
          <h2 className={styles.headtitle}>Начинки</h2>
          <div className={styles.content}>
            <IngredientsList type="main" />
          </div>
        </Element>
      </div>
    </>
  );
}

// BurgerIngredients.propTypes = {
//   addIngredient: PropTypes.func.isRequired,
//   data: PropTypes.arrayOf(PropsValidation),
// };

export default BurgerIngredients;
