import { Col, Container, Form, Row } from "react-bootstrap";
import { Employee, Equipment, IssueCreate } from "../../types";
import LblEdit from "./LblEdit";
import { Dispatch, useEffect, useState } from "react";
import useHttpData from "../../hooks/useHttpData";
import { searchEmployeesURL } from "../../hooks/urls";

type Props = {
  equipments?: Equipment[];
  issueData: IssueCreate;
  setIssueData: Dispatch<React.SetStateAction<IssueCreate>>;
};

function DataContainer({ equipments, issueData, setIssueData }: Props) {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  const [employees, setEmployees] = useState<Employee[]>();

  const { data: employeesData, search: searchEmployees } =
    useHttpData<Employee[]>();

  useEffect(() => {
    loadEmployees();
    handleSetIssueValues("reportedDate", getTodayDate());
  }, []);

  const loadEmployees = () => {
    const url = searchEmployeesURL();
    searchEmployees(url);
  };

  useEffect(() => {
    if (employeesData) {
      const empFiltered = employeesData.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
      setEmployees(empFiltered);
    }
  }, [employeesData]);

  const handleSelectEquipment = (equipId: number) => {
    setIssueData((prev) => ({
      ...prev,
      equipmentsId: equipId,
    }));
  };

  const handleSelectEmployee = (empId: number) => {
    const emp = employees?.find((empl) => empl.employeesId == empId);
    const empName = emp ? emp?.firstName + " " + emp?.lastName : "";
    setIssueData((prev) => ({
      ...prev,
      reportedBy: empName,
      createdBy: empName,
      updatedBy: empName,
    }));
  };

  const handleSetIssueValues = (prop: string, value: string) => {
    setIssueData((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  //   console.log(issueData);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Form.Select
              aria-label="Default select example"
              style={{ fontWeight: "bold", textAlign: "center" }}
              onChange={(e) => handleSelectEquipment(Number(e.target.value))}
            >
              <option>Select equipment</option>
              {equipments?.map((equip) => (
                <option
                  key={equip.equipmentsId}
                  value={equip.equipmentsId}
                  style={{ fontWeight: "bold" }}
                >
                  {equip.number}
                  {" - "}
                  {equip.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Form.Select
              aria-label="Default select example"
              style={{ fontWeight: "bold", textAlign: "center" }}
              onChange={(e) => handleSelectEmployee(Number(e.target.value))}
              //   onChange={(e) => handleEquipmentChange(Number(e.target.value))}
            >
              <option>Reported By</option>
              {employees?.map(
                (employee) =>
                  employee.status == "Active" &&
                  (employee.title == "Labor" ||
                    employee.title == "Supervisor") && (
                    <option
                      key={employee.employeesId}
                      value={employee.employeesId}
                    >
                      {employee.firstName} {employee.lastName}
                    </option>
                  )
              )}
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="date"
              placeholder="Normal text"
              style={{ fontWeight: "bold", textAlign: "center" }}
              onChange={(e) =>
                handleSetIssueValues("reportedDate", e.target.value)
              }
              value={issueData.reportedDate}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Form.Select
              aria-label="Default select example"
              style={{ fontWeight: "bold", textAlign: "center" }}
              onChange={(e) =>
                handleSetIssueValues("priorityIssue", e.target.value)
              }
            >
              <option>Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              style={{ fontWeight: "bold", textAlign: "center" }}
              onChange={(e) =>
                handleSetIssueValues("typeIssue", e.target.value)
              }
            >
              <option>Type</option>
              <option value="Blown Hose">Blown Hose/Hydraulic Leak</option>
              <option value="Oil Leak">Oil Leak</option>
              <option value="Other Fluid Leak">Other Fluid Leak</option>
              <option value="Overheating">Overheating</option>
              <option value="Won't start">Won't start</option>
              <option value="Physical damage">Physical damage</option>
              <option value="Won't track/move">Won't track/move</option>
              <option value="Low Power">Low Power</option>
              <option value="Control/electrical issue">
                Control/electrical issue
              </option>
              <option value="Smoke/smell">Smoke/smell</option>
              <option value="Weird Sounds">Weird Sounds</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <LblEdit
              label="Description"
              value={issueData?.descriptionIssue}
              onChange={handleSetIssueValues}
              prop="descriptionIssue"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <LblEdit
              label="Details"
              value={issueData?.details}
              onChange={handleSetIssueValues}
              prop={"details"}
            />
          </Col>
        </Row>
      </Container>
      {/* <Label label="1" value="2" />
      <Label label="1" value="2" />
      <Label label="1" value="2" /> */}
    </>
  );
}

export default DataContainer;
