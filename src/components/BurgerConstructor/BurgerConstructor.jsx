import React from "react";
import data from "../../utils/data";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientItem from "../IngredientItem/IngredientItem";

function BurgerTop(props) {
  for (let i = 0; i < data.data.length; i++) {
    if (
      data.data[i].type === "bun" &&
      props.ingredients.get(data.data[i]._id) !== undefined &&
      props.ingredients.get(data.data[i]._id) > 0
    ) {
      return (
        <div className={styles.content}>
          <div className={styles.block}></div>
          <ConstructorElement
            key="top"
            type="top"
            isLocked={true}
            text={data.data[i].name + " (верх)"}
            price={data.data[i].price}
            thumbnail={data.data[i].image}
            handleClose={() => {
              props.removeIngredient(data.data[i]._id);
            }}
          />
        </div>
      );
    }
  }
  return <div></div>;
}

function BurgerBottom(props) {
  for (let i = 0; i < data.data.length; i++) {
    if (
      data.data[i].type === "bun" &&
      props.ingredients.get(data.data[i]._id) !== undefined &&
      props.ingredients.get(data.data[i]._id) > 0
    ) {
      return (
        <div className={styles.content}>
          <div className={styles.block}></div>
          <ConstructorElement
            key="bottom"
            type="bottom"
            isLocked={true}
            text={data.data[i].name + " (низ)"}
            price={data.data[i].price}
            thumbnail={data.data[i].image}
            handleClose={() => {
              props.removeIngredient(data.data[i]._id);
            }}
          />
        </div>
      );
    }
  }
  return <div></div>;
}

function BurgerMain(props) {
  const buns = [];
  for (let i = 0; i < data.data.length; i++) {
    if (
      data.data[i].type !== "bun" &&
      props.ingredients.get(data.data[i]._id) !== undefined &&
      props.ingredients.get(data.data[i]._id) > 0
    ) {
      for (let r = 0; r < props.ingredients.get(data.data[i]._id); r++) {
        buns.push(
          <div key={data.data[i]._id + r} className={styles.content}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={data.data[i].name}
              price={data.data[i].price}
              thumbnail={data.data[i].image}
              handleClose={() => {
                props.removeIngredient(data.data[i]._id);
              }}
            />
          </div>
        );
      }
    }
  }
  return buns.length > 0 ? buns : null;
}

function Sum(props) {
  let sum = 0;
  for (let i = 0; i < data.data.length; i++) {
    if (props.ingredients.get(data.data[i]._id) !== undefined) {
      sum += data.data[i].price * props.ingredients.get(data.data[i]._id);
    }
  }
  return sum;
}

function BurgerConstructor(props) {
  return (
    <>
      <div className={`${styles.container} custom-scroll`}>
        <BurgerTop
          removeIngredient={props.removeIngredient}
          ingredients={props.ingredients}
        />
        <BurgerMain
          removeIngredient={props.removeIngredient}
          ingredients={props.ingredients}
        />
        <BurgerBottom
          removeIngredient={props.removeIngredient}
          ingredients={props.ingredients}
        />
      </div>
      <div className={styles.price}>
        <div className={styles.price_content}>
          <p className={styles.price_sum}>{Sum(props)}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => {props.setActive(true)}} htmlType="button" type="primary" size="small" extraClass="ml-2">
          Оформить заказ
        </Button>
      </div>
    </>
  );
}

export default BurgerConstructor;
