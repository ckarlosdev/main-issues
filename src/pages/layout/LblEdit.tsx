import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

type Props = {
  label?: string;
  value?: string;
  prop: string;
  onChange: (prop: string, data: string) => void;
};

function LblEdit({ label, value, onChange, prop }: Props) {
  const [property, setProperty] = useState<string>("");

  useEffect(() => {
    setProperty(prop);
  }, []);

  return (
    <>
      <FloatingLabel controlId="floatingTextarea" label={label}>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={value}
          style={{ marginTop: "1px", marginBottom: "1px", fontWeight: "bold" }}
          onChange={(e) => onChange(property, e.target.value)}
        />
      </FloatingLabel>
    </>
  );
}

export default LblEdit;
