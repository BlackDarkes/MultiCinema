import { Container } from "@/shared/ui";
import IconLogo from "@/shared/assets/logo.svg?react";
import { HeaderNav } from "../HeaderNav/HeaderNav";
import { LIST_NAV } from "../../model/listNav.constant";
import { HeaderButtons } from "../HeaderButtons/HeaderButtons";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <IconLogo />

        <HeaderNav list={LIST_NAV} />

        <HeaderButtons />
      </Container>
    </header>
  );
}