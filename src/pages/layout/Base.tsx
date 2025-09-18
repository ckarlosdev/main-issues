import {
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import List from "./List";
import Title from "./Title";
import EquipmentSelect from "./EquipmentSelect";
import FlowFilters from "./FlowFilters";
import CardName from "./CardName";
import { SetStateAction, useEffect, useState } from "react";
import { searchEquipmentsURL, searchIssuesURL } from "../../hooks/urls";
import useHttpData from "../../hooks/useHttpData";
import { Equipment, Issue, IssueCreate } from "../../types";
import DataContainer from "./DataContainer";
import useMain from "../../hooks/useMain";

type Props = {};

function Base({}: Props) {
  const [issues, setIssues] = useState<Issue[] | undefined>();
  const [equipments, setEquipments] = useState<Equipment[] | undefined>();
  const [flowsSelected, setFlowsSelected] = useState(["Pending"]);
  const [equipmentSelected, setEquipmentSelected] = useState<number>();
  const [showModalSubmit, setShowModalSubmit] = useState(false);

  const [issueData, setIssueData] = useState<IssueCreate>({
    equipmentsIssuesId: 0,
    checklistsId: 1,
    equipmentsId: 0,
    flow: "Pending",
    reportedBy: "",
    reportedDate: "",
    priorityIssue: "",
    typeIssue: "",
    descriptionIssue: "",
    details: "",
    createdBy: "",
    updatedBy: "",
  });

  const { submitData } = useMain();

  const { data: issuesData, search: searchIssues } = useHttpData<Issue[]>();
  const { data: equipmentsData, search: searchEquipments } =
    useHttpData<Equipment[]>();

  useEffect(() => {
    loadEquipments();
    loadIssues();
  }, []);

  const loadEquipments = () => {
    const url = searchEquipmentsURL();
    searchEquipments(url);
  };

  useEffect(() => {
    if (equipmentsData) {
      setEquipments(equipmentsData);
    }
  }, [equipmentsData]);

  const loadIssues = () => {
    const url = searchIssuesURL();
    searchIssues(url);
  };

  useEffect(() => {
    if (issuesData) {
      const issuesCopy = [...issuesData];
      const issuesOrdered = issuesCopy.sort((a, b) => {
        const dateA = new Date(a.reportedDate);
        const dateB = new Date(b.reportedDate);
        return dateB.getTime() - dateA.getTime();
      });
      setIssues(issuesOrdered);
    }
  }, [issuesData]);

  const handleChange = (val: SetStateAction<string[]>) => {
    setFlowsSelected(val);
  };

  const handleEquipmentChange = (equipId: number) => {
    setEquipmentSelected(equipId);
    console.log(equipId);
  };

  const findEquipmentById = (idToFind: number) => {
    if (equipments) {
      const equipNumber = equipments.find(
        (equipment) => equipment.equipmentsId === idToFind
      );

      return equipNumber?.number;
    } else {
      return "";
    }
  };

  const handleCloseModalSubmit = () => setShowModalSubmit(false);
  const handleShowModalSubmit = () => setShowModalSubmit(true);

  const handleSubmitIssue = async () => {
    console.log(issueData);
    let validation = validateNewIssueData();

    if (validation) {
      let result: Issue | undefined;
      console.log("Saving issue data");
      result = await submitData(issueData);
      alert("¡Data saved!");
      if (result && result?.equipmentsIssuesId) {
        setIssueData((prev) => ({
          ...prev,
          equipmentsIssuesId: result?.equipmentsIssuesId ?? 0,
        }));

        loadIssues();
      }
      handleCloseModalSubmit();
    }
  };

  const validateNewIssueData = () => {
    if (!issueData.equipmentsId) {
      alert("Select an equipment.");
      return false;
    } else if (!issueData.reportedBy) {
      alert("Select reported by.");
      return false;
    } else if (issueData.reportedDate === "") {
      alert("Select a date.");
      return false;
    } else if (
      issueData.priorityIssue === "" ||
      issueData.priorityIssue === "Priority"
    ) {
      alert("Select priority.");
      return false;
    } else if (issueData.typeIssue === "" || issueData.typeIssue === "Type") {
      alert("Select issue type.");
      return false;
    } else if (issueData.descriptionIssue === "") {
      alert("Description missing.");
      return false;
    }
    return true;
  };

  // console.log(issueData);

  return (
    <>
      <div>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Title />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Card>
                <CardTitle>
                  <CardName>Equipment selected</CardName>
                </CardTitle>
                <Card.Body>
                  <EquipmentSelect
                    equipments={equipments}
                    equipmentSelected={equipmentSelected}
                    handleEquipmentChange={handleEquipmentChange}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col xs lg="7">
              <Card style={{ marginTop: "10px" }}>
                <CardTitle>
                  <CardName>Flow</CardName>
                </CardTitle>
                <Card.Body>
                  <FlowFilters
                    flowsSelected={flowsSelected}
                    handleChange={handleChange}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center" style={{ height: "65vh" }}>
            <Col xs lg="7" className="h-100">
              <Card className="h-100" style={{ marginTop: "10px" }}>
                <CardTitle>
                  <CardName>Issues</CardName>
                </CardTitle>
                <Card.Body
                  className="d-flex flex-column"
                  style={{ overflowY: "auto" }}
                >
                  <List
                    issues={issues}
                    flowsSelected={flowsSelected}
                    equipNumberSelected={findEquipmentById(
                      Number(equipmentSelected)
                    )}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col
              md="auto"
              style={{ marginTop: "20px", marginBottom: "20px" }}
              className="d-flex flex-wrap justify-content-center"
            >
              <Button
                style={{ fontWeight: "bold" }}
                onClick={handleShowModalSubmit}
              >
                <i className="bi bi-plus-circle"> new Issue</i>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        size="lg"
        show={showModalSubmit}
        onHide={handleCloseModalSubmit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "lightgray",
          }}
        >
          <Modal.Title style={{ fontWeight: "bold" }}>
            <i className="bi bi-plus-circle"> New issue</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <DataContainer
              equipments={equipments}
              issueData={issueData}
              setIssueData={setIssueData}
            />
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="secondary"
            style={{ width: "120px", fontWeight: "bold" }}
            onClick={handleCloseModalSubmit}
          >
            Close
          </Button>
          <Button
            style={{ width: "120px", fontWeight: "bold" }}
            variant="primary"
            onClick={handleSubmitIssue}
          >
            Save issue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Base;
