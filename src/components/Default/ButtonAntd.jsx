import { Button } from "antd";
import "./ButtonAntd.css";
export default function ButtonAntd({ children, title, fn }) {
  return (
    <Button onClick={fn} title={title} type="primary">
      {children}
    </Button>
  );
}
