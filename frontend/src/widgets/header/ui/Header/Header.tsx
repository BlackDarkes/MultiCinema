import { Container } from "@/shared/ui";
import IconLogo from "@/shared/assets/logo.svg?react";
import { HeaderNav } from "../HeaderNav/HeaderNav";
import { LIST_NAV } from "../../model/listNav.constant";
import { HeaderButtons } from "../HeaderButtons/HeaderButtons";

export const Header = () => {
  return (
    <header>
      <Container>
        <IconLogo />

        <HeaderNav list={LIST_NAV} />

        <HeaderButtons />
      </Container>
    </header>
  );
}