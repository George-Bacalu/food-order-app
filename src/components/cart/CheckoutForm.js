import { useContext, useRef, useState } from "react";
import CartContext from "../../store/cart-context";
import CheckoutFormInput from "../ui/CheckoutFormInput";
import classes from "./CheckoutForm.module.css";

const isEmpty = value => value.trim() === "";
const isPostalCode = value => value.trim().length === 5;

const CheckoutForm = props => {
  const cartCtx = useContext(CartContext);
  const [formValidity, setFormValidity] = useState({ name: true, street: true, postalCode: true, city: true });
  const { name: nameIsValid, street: streetIsValid, city: cityIsValid, postalCode: postalCodeIsValid } = formValidity;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isPostalCode(enteredPostalCode);

    setFormValidity({ name: enteredNameIsValid, street: enteredStreetIsValid, city: enteredCityIsValid, postalCode: enteredPostalCodeIsValid });
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
    if (!formIsValid) return;
    props.onSubmit({ name: enteredName, street: enteredStreet, city: enteredCity, postalCode: enteredPostalCode });

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalCodeInputRef.current.value = "";
    cityInputRef.current.value = "";
  };

  const nameControlClasses = `${classes.control} ${!nameIsValid && classes.invalid}`;
  const streetControlClasses = `${classes.control} ${!streetIsValid && classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${!postalCodeIsValid && classes.invalid}`;
  const cityControlClasses = `${classes.control} ${!cityIsValid && classes.invalid}`;

  const formData = [
    {
      id: "name",
      ref: nameInputRef,
      label: "Your name",
      type: "text",
      errorMessage: "Please enter a valid name!",
      inputClasses: nameControlClasses,
      isValid: nameIsValid,
    },
    {
      id: "street",
      ref: streetInputRef,
      label: "Street",
      type: "text",
      errorMessage: "Please enter a valid street!",
      inputClasses: streetControlClasses,
      isValid: streetIsValid,
    },
    {
      id: "postal",
      ref: postalCodeInputRef,
      label: "Postal Code",
      type: "text",
      errorMessage: "Please enter a valid postal code (5 characters long)!",
      inputClasses: postalCodeControlClasses,
      isValid: postalCodeIsValid,
    },
    {
      id: "city",
      ref: cityInputRef,
      label: "City",
      type: "text",
      errorMessage: "Please enter a valid city!",
      inputClasses: cityControlClasses,
      isValid: cityIsValid,
    },
  ];

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      {formData.map(inputData => {
        const { id, ref, label, type, errorMessage, inputClasses, isValid } = inputData;
        return <CheckoutFormInput ref={ref} id={id} label={label} type={type} errorMessage={errorMessage} inputClasses={inputClasses} isValid={isValid} />;
      })}
      <div className={classes.actions}>
        <button type="button" onClick={cartCtx.hideCart}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
