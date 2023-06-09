import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import PropsValidation from "../PropsValidation/PropsValidation";

function IngredientDetails(props) {
  if (props.modalData === undefined) {
    return <div></div>;
  }

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img
        className={styles.img}
        src={props.modalData.image}
        alt={props.modalData.name}
      />
      <h2 className={`${styles.subtitle} text text_type_main-medium`}>
        {props.modalData.name}
      </h2>
      <div className={styles.content}>
        <div className={styles.container}>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            {props.modalData.calories}
          </p>
        </div>
        <div className={styles.container}>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            {props.modalData.proteins}
          </p>
        </div>
        <div className={styles.container}>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </p>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            {props.modalData.fat}
          </p>
        </div>
        <div className={styles.container}>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </p>
          <p
            className={`${styles.nutrition} text text_type_main-default text_color_inactive`}
          >
            {props.modalData.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
}
IngredientDetails.propTypes = {
  modalData: PropTypes.shape(PropsValidation),
}

export default IngredientDetails;
