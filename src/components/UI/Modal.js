import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="modal" onClick={props.onClick || null}>
      {props.children}
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
