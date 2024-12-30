import { Button } from "antd";
import "./ButtonAntd.css";
export default function ButtonAntd({ children, title, fn }) {
  return (
    <Button
      onClick={fn}
      title={title}
      type="primary"
      style={{
        height: "40px",
        background: `linear-gradient(
    90deg,
    rgba(33, 86, 164, 1) 5%,
    rgba(255, 0, 0, 0.9915615904564951) 91%
  )`,
      }}
    >
      {children}
    </Button>
  );
}
