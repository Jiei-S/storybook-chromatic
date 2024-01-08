import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = {
  href: string;
  text: string;
};

const Link: FC<LinkProps> = ({ href, text }) => <RouterLink to={href}>{text}</RouterLink>;

export default Link;
