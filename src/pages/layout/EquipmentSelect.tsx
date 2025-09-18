import { Form } from "react-bootstrap";
import { Equipment } from "../../types";

type Props = {
  equipments?: Equipment[];
  equipmentSelected?: number;
  handleEquipmentChange: (equipId: number) => void;
};

function EquipmentSelect({
  equipments,
  equipmentSelected,
  handleEquipmentChange,
}: Props) {
  return (
    <Form.Select
      aria-label="Default select example"
      style={{ textAlign: "center", fontWeight: "bold" }}
      value={equipmentSelected}
      onChange={(e) => handleEquipmentChange(Number(e.target.value))}
    >
      <option key="0" value="0">
        Open this select Equipment
      </option>
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
  );
}

export default EquipmentSelect;
