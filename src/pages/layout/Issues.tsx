type Props = {};

function Issues({}: Props) {
  return (
    <table className="table table-bordered table-striped rounded-2 overflow-hidden">
      <thead>
        <tr style={{ textAlign: "center" }}>
          <th>Number</th>
          <th>Equipment</th>
          <th>Date</th>
          <th>Issue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo asdasd asdasd</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo asdasd </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo asdasd asdasd</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo asdasd</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Issues;
