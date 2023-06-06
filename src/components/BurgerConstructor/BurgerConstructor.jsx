import PropTypes from "prop-types";
import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropsValidation from "../PropsValidation/PropsValidation";

function BurgerPart(props) {
  const mas = [];
  for (let i = 0; i < props.data.length; i++) {
    if (
      props.part.type.includes(props.data[i].type) &&
      props.data[i].count > 0
    ) {
      for (let j = 0; j < props.data[i].count; j++) {
        const key = props.part.key + props.data[i]._id + j;

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
              text={props.data[i].name + props.part.appendix}
              price={props.data[i].price}
              thumbnail={props.data[i].image}
              handleClose={() => {
                props.removeIngredient(props.data[i]._id);
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
  data: PropTypes.arrayOf(PropsValidation),
  removeIngredient: PropTypes.func.isRequired,
};

function Sum(props) {
  if (props.data === undefined) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].count !== undefined) {
      sum +=
        props.data[i].price *
        props.data[i].count;
    }
  }
  return sum;
}

Sum.propTypes = {
  data: PropTypes.arrayOf(PropsValidation),
};

function BurgerConstructor(props) {
  return (
    <>
      <div className={`${styles.container__conetnt}`}>
        <BurgerPart
          data={props.data}
          removeIngredient={props.removeIngredient}
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
            data={props.data}
            removeIngredient={props.removeIngredient}
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
          data={props.data}
          removeIngredient={props.removeIngredient}
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
  data: PropTypes.arrayOf(PropsValidation),
  removeIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
