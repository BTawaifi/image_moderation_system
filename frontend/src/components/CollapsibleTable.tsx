import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";
import Row from "./Row";
import Axios from "axios";
import { ReportType } from "../types/ReportType";
import Config from "../config"

export default function CollapsibleTable() {
  const [reports, setReports] = React.useState<Array<ReportType>>([])

  const handleRefresh = async () => {
    await Axios.get(Config.backofficeUrl())
      .then((res) => setReports(res.data))
      .catch((error) => console.log(error))
  };

  const removeReport = async (report: ReportType) => {
    setReports((state) => state.filter(function (state_report) {
      return state_report !== report
    }));
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Report Id</TableCell>
            <TableCell align="left">User Id</TableCell>
            <TableCell align="left">Prefilter Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports && reports.map((report: ReportType) => (
            <Row key={report.id} row={report} remove={removeReport} />
          ))}
        </TableBody>
      </Table>
      <Fab
        onClick={handleRefresh}
        color="primary"
        aria-label="add"
        style={{ position: "fixed", right: "1em", bottom: "1em" }}
      >
        <RefreshIcon />
      </Fab>
    </TableContainer>
  );
}
