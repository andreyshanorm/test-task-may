import {
  type InputHTMLAttributes,
  type ReactNode,
  memo,
  useCallback,
} from "react";
import cn from "classNames"; 
import styles from "./Checkbox.module.css";


interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  appearance: "big" | "small"; 
  name: string;
  checked: boolean;
  children: ReactNode;
  onChange: () => void;
}


export const CheckBox = memo(function CheckBox({
  appearance,
  name,
  checked,
  children,
  onChange,
  ...rest 
}: CheckboxProps) {
  const inputClasses = cn(styles.input, {
    [styles.big]: appearance === "big",
    [styles.small]: appearance === "small",
  });

  const handleLabelClick = useCallback(
    (e: React.MouseEvent<HTMLLabelElement>) => {
      e.preventDefault();
      onChange();
    },
    [onChange]
  );

  return (
    <div className={styles["checkbox-block"]}>
      <input
        {...rest} 
        type="checkbox"
        checked={checked}
        name={name}
        id={name}
        onChange={onChange}
        className={inputClasses}
        aria-checked={checked} 
      />
      <label htmlFor={name} onClick={handleLabelClick} className={styles.label}>
        {children}
      </label>
    </div>
  );
});

export default CheckBox;
