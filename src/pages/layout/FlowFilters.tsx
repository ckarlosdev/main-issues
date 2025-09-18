import { SetStateAction } from "react";
import { Col, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

type Props = {
  flowsSelected: string[];
  handleChange: (val: SetStateAction<string[]>) => void;
};

function FlowFilters({ flowsSelected, handleChange }: Props) {
  return (
    <div>
      <Row className="justify-content-md-center">
        <Col md="auto" className="d-flex flex-wrap justify-content-center">
          <ToggleButtonGroup
            type="checkbox"
            value={flowsSelected}
            onChange={handleChange}
          >
            <ToggleButton
              id="tbg-btn-1"
              variant="outline-secondary"
              value={"Pending"}
              style={{ width: "110px" }}
            >
              Pending
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-2"
              variant="outline-primary"
              value={"In Progress"}
              style={{ width: "110px" }}
            >
              In progress
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-3"
              variant="outline-success"
              value={"Fixed"}
              style={{ width: "110px" }}
            >
              Fixed
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
    </div>
  );
}

export default FlowFilters;
