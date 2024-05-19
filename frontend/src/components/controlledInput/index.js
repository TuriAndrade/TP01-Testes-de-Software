export default function ControlledInput({
  label,
  state,
  setState,
  formatter,
  error,
  ...rest
}) {
  return (
    <div className="form__box">
      <label
        className={error ? "form__label form__label--error" : "form__label"}
      >
        {label}
      </label>
      <input
        {...rest}
        className={error ? "form__input form__input--error" : "form__input"}
        value={state}
        onChange={(e) =>
          formatter
            ? formatter(e.target.value) && setState(e.target.value)
            : setState(e.target.value)
        }
      />
      {error && <p className="form__errorMessage">{error}</p>}
    </div>
  );
}
