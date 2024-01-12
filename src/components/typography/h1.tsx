import { FC } from "react";

export type Heading1Props = {
  text: string;
};

const Heading1: FC<Heading1Props> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default Heading1;
