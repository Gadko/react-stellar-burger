
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import ReactDOM from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useEffect} from 'react';

const modalRoot = document.getElementById("react-modals");

function Modal({active, setActive, children}) {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        setActive(false)
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  })



  return ReactDOM.createPortal((
    <>
      <div className={active ? styles.popup + " " + styles.active : styles.popup}>
          <div className={styles.container}>
            <button type="button" className={styles.close} onClick={() => setActive(false)}></button>
            {children}
          </div>
          <ModalOverlay setActive={setActive}/>
      </div>
    </>
  ), modalRoot);
}


Modal.propTypes = { 
  active: PropTypes.bool.isRequired, 
  setActive: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired 
};

export default Modal;
