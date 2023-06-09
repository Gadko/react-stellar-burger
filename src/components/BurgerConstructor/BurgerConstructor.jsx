import PropTypes from "prop-types";
import { useContext } from "react";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalContext } from "../../service/appContext";
import { postInfoOrder } from "../../utils/burger-api";

export const masId = [];
export const answer = [];

function BurgerPart(props) {
  const value = useContext(ModalContext);

  const mas = [];
  for (let i = 0; i < value.api.ingredients.length; i++) {
    if (
      props.part.type.includes(value.api.ingredients[i].type) &&
      value.api.ingredients[i].count > 0
    ) {
      for (let j = 0; j < value.api.ingredients[i].count; j++) {
        const key = props.part.key + value.api.ingredients[i]._id + j;

        mas.push(
          <div key={key} className={styles.content}>
            {props.part.type.includes("bun") ? (
              <div key={j} className={styles.block}></div>
            ) : (
              <DragIcon key={j} type="primary" />
            )}
            <ConstructorElement
              key={key}
              type={props.part.key}
              isLocked={props.part.isLocked}
              text={value.api.ingredients[i].name + props.part.appendix}
              price={value.api.ingredients[i].price}
              thumbnail={value.api.ingredients[i].image}
              handleClose={() => {
                value.removeIngredient(value.api.ingredients[i]._id);
              }}
            />
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
  part: PropTypes.shape({ 
    key: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    isLocked: PropTypes.bool, 
    appendix: PropTypes.string, 
    onlyOne: PropTypes.bool, 
  }).isRequired, };

function Sum() {
  const value = useContext(ModalContext);

  if (value.api.ingredients === undefined) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < value.api.ingredients.length; i++) {
    if (value.api.ingredients[i].count !== undefined) {
      sum += value.api.ingredients[i].price * value.api.ingredients[i].count;
    }
  }
  return sum;
}

function BurgerConstructor(props) {
  const value = useContext(ModalContext);

  return (
    <>
      <div className={`${styles.container__conetnt}`}>
        <BurgerPart
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
            value.api.ingredients.forEach((item) => {
              masId.push(item._id);
            });
            postInfoOrder(masId).then((res) => {
              answer.push(res.order.number);
            });
            setTimeout(() => {
              value.setModalOrderActive(true);
            }, 400);
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

export default BurgerConstructor;
