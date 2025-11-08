import { useWebStore } from "@/app/store/store";
import styles from "./BurgerButton.module.scss";

export const BurgerButton = () => {
  const { handleOpen, isOpenBurger } = useWebStore();

  return (
    <button
      type="button"
      className={`${styles.burger} ${isOpenBurger ? styles.burgerActive : ""}`}
      onClick={handleOpen}
      aria-label="burger button"
    >
      <span />
    </button>
  );
};
