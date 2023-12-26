import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  href: string;
  text: string;
};

const Link: FC<Props> = ({ href, text }) => <RouterLink to={href}>{text}</RouterLink>;

export default Link;
