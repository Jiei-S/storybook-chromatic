import { FC } from "react";

type Props = {
  text: string;
};

const Heading1: FC<Props> = ({ text }) => {
  return <h1>{text}</h1>;
};

export default Heading1;
