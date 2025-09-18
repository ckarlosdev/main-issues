import { Badge, Button, Card, ListGroup, Modal } from "react-bootstrap";
import { Issue } from "../../types";
import { useState } from "react";
import Label from "./Label";

type Props = {
  issues?: Issue[];
  flowsSelected: string[];
  equipNumberSelected: string | undefined;
};

function List({ issues, flowsSelected, equipNumberSelected }: Props) {
  const [issueIdSelected, setIssueIdSelected] = useState<number>();
  const [issueSelected, setIssueSelected] = useState<Issue>();
  const [show, setShow] = useState(false);

  const handleSelectIssue = (value: number) => {
    setIssueIdSelected(value);
    const issueData = issues?.find(
      (issue) => issue.equipmentsIssuesId == value
    );
    setIssueSelected(issueData);
    handleShow();
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        <ListGroup as="ol">
          {issues?.map((issue) => {
            const exists = flowsSelected.includes(issue.flow);
            if (
              exists &&
              (!equipNumberSelected ||
                equipNumberSelected == issue.equipmentNumber)
            ) {
              return (
                <ListGroup.Item
                  as="li"
                  className={`d-flex justify-content-between align-items-start ${
                    issueIdSelected == issue.equipmentsIssuesId ? "active" : ""
                  }`}
                  style={{ height: "90px" }}
                  key={issue.equipmentsIssuesId}
                  onClick={() => handleSelectIssue(issue.equipmentsIssuesId)}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold" style={{ fontSize: "15px" }}>
                      {issue.equipmentNumber}
                      {" - "}
                      {issue.equipmentName}
                    </div>
                    <span style={{ fontWeight: "bold" }}>
                      {issue.priorityIssue}
                    </span>
                    <span> - {issue.typeIssue}</span>
                    <span> - {"(" + issue.reportedDate + ")"}</span>
                  </div>
                  <Badge
                    bg={`${
                      issue.flow == "Pending"
                        ? "secondary"
                        : issue.flow == "In Progress"
                        ? "primary"
                        : "success"
                    }`}
                    style={{ minWidth: "90px" }}
                    pill
                  >
                    {issue.flow}
                  </Badge>
                </ListGroup.Item>
              );
            }
          })}
        </ListGroup>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "lightgray",
          }}
        >
          <div>
            <Modal.Title>
              <i className="bi bi-clipboard2-data"> Issue details</i>
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ marginTop: "5px" }}>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {issueSelected?.equipmentNumber}
                {" - "}
                {issueSelected?.equipmentName}
              </span>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "5px" }}>
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>
                {"Reported by: "}
                {issueSelected?.reportedBy}
              </span>
              <span>
                {"Reported date: "}
                {issueSelected?.reportedDate}
              </span>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "5px" }}>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  {"Priority: "}
                  {issueSelected?.priorityIssue}
                </span>
                <span style={{ fontWeight: "bold" }}>
                  {"Type: "}
                  {issueSelected?.typeIssue}
                </span>
              </div>
              <Label
                label={"Description: "}
                value={issueSelected?.descriptionIssue}
              />
              <Label
                label={"Details: "}
                value={issueSelected?.details ? issueSelected?.details : ""}
              />
              <Label
                label={"Comments: "}
                value={issueSelected?.comments ? issueSelected?.comments : ""}
              />
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="outline-secondary"
            style={{ fontWeight: "bold" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default List;
