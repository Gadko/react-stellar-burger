import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";


function ModalOverlay({ active, setActive, children }) {
  return (
    <>
      <div className={styles.overlay} onClick={() => setActive(false)}></div>
    </>
  );
}

ModalOverlay.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default ModalOverlay;
