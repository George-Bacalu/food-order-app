import { forwardRef } from "react";

const CheckoutFormInput = forwardRef((props, ref) => {
  return (
    <div className={props.inputClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} type={props.type} id={props.id} />
      {!props.isValid && <p style={{ color: "red" }}>{props.errorMessage}</p>}
    </div>
  );
});

export default CheckoutFormInput;
