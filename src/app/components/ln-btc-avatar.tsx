import { Circle } from "@stacks/ui";
import LnLogo from '../../../public/assets/trubit-logo/ln-logo.svg';

export const LnBtcAvatar = () => {
  return (
    <Circle position="relative" size="36px">
      <img src={LnLogo}/>
    </Circle>
  );
};