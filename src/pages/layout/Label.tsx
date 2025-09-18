import { FloatingLabel, Form } from "react-bootstrap";

type Props = {
  label?: string;
  value?: string;
};

function Label({ label, value }: Props) {
  return (
    <>
      <FloatingLabel controlId="floatingTextarea" label={label}>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          readOnly
          value={value}
          style={{ marginTop: "1px", marginBottom: "1px", fontWeight: "bold" }}
        />
      </FloatingLabel>
    </>
  );
}

export default Label;
