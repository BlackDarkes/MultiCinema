import { Button } from "@/shared/ui";
import IconSearch from "../../assets/search.svg?react";
import IconProfile from "../../assets/profile.svg?react";
import styles from "./HeaderButtons.module.scss";

export const HeaderButtons = () => {
  return (
    <div className={styles.buttons}>
      <Button><IconSearch /></Button>
      <Button><IconProfile /></Button>
    </div>
  );
}