import { Button } from "@/shared/ui";
import IconSearch from "../../assets/search.svg?react";
import IconProfile from "../../assets/profile.svg?react";

export const HeaderButtons = () => {
  return (
    <div>
      <Button><IconSearch /></Button>
      <Button><IconProfile /></Button>
    </div>
  );
}