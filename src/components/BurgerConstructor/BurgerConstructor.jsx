import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerPart(props) {
  const mas = [];
  for (let i = 0; i < props.data.length; i++) {
    if (
      props.part.type.includes(props.data[i].type) &&
      props.ingredients.get(props.data[i]._id) !== undefined &&
      props.ingredients.get(props.data[i]._id) > 0
    ) {
      for (
        let j = 0;
        j < props.ingredients.get(props.data[i]._id);
        j++
      ) {
        const key=props.part.key+props.data[i]._id+j
        mas.push(
          <div key={key} className={styles.content}>
            {props.part.type.includes('bun') ? <div key={key} className={styles.block}></div> : <DragIcon key={key} type="primary" />}
            <button className={styles.button} onClick={() => {props.setActiveDetails(props.data[i]._id)}}>
              <ConstructorElement
                key={key}
                type={props.part.key}
                isLocked={props.part.isLocked}
                text={props.data[i].name + props.part.appendix}
                price={props.data[i].price}
                thumbnail={props.data[i].image}
                handleClose={() => {
                  props.removeIngredient(props.data[i]._id);
                }}
              />
            </button>
            
          </div>
        );
        if (props.part.onlyOne === true) {
          return mas;
        }
      }
    }
  }
  return mas;
}

BurgerPart.propTypes = {
  ingredients: PropTypes.instanceOf(Map).isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

function Sum(props) {
  if (props.data === undefined) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < props.data.ingredients.length; i++) {
    if (props.ingredients.get(props.data.ingredients[i]._id) !== undefined) {
      sum += props.data.ingredients[i].price * props.ingredients.get(props.data.ingredients[i]._id);
    }
  }
  return sum;
}

Sum.propTypes = {
  ingredients: PropTypes.instanceOf(Map).isRequired,
};

function BurgerConstructor(props) {
  return (
    <>
      <div className={`${styles.container__conetnt}`}>
        <BurgerPart
          setActiveDetails={props.setActiveDetails}
          data={props.data.ingredients}
          removeIngredient={props.removeIngredient}
          ingredients={props.ingredients}
          part={{
            type: ["bun"],
            onlyOne: true,
            key: "top",
            isLocked: true,
            appendix: " (верх)",
          }}
        />
        <div className={`${styles.container} custom-scroll`}>
          <BurgerPart
            setActiveDetails={props.setActiveDetails}
            data={props.data.ingredients}
            removeIngredient={props.removeIngredient}
            ingredients={props.ingredients}
            part={{
              type: ["main", "sauce"],
              onlyOne: false,
              key: "",
              isLocked: false,
              appendix: "",
            }}
          />
        </div>
        <BurgerPart
          setActiveDetails={props.setActiveDetails}
          data={props.data.ingredients}
          removeIngredient={props.removeIngredient}
          ingredients={props.ingredients}
          part={{
            type: ["bun"],
            onlyOne: true,
            key: "bottom",
            isLocked: true,
            appendix: " (низ)",
          }}
        />
      </div>
      <div className={styles.price}>
        <div className={styles.price_content}>
          <p className={styles.price_sum}>{Sum(props)}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => {
            props.setActive(true);
          }}
          htmlType="button"
          type="primary"
          size="small"
          extraClass="ml-2"
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  setActive: PropTypes.func.isRequired,
  ingredients: PropTypes.instanceOf(Map).isRequired,
  removeIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
