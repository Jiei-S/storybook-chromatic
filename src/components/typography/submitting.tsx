import { FC } from "react";

const Submitting: FC = () => (
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    }}
  >
    <div>Submitting...</div>
  </div>
);

export default Submitting;
