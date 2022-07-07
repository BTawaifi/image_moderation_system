import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ReportType } from "../types/ReportType";
import Axios from "axios";
import Config from "../config"

export default function Row(props: { row: ReportType, remove: Function }) {
  const { row, remove } = props;
  const [open, setOpen] = React.useState(false);

  const handleMod = async (e: any) => {
    await Axios.put(Config.backofficeUrl() + '/' + row.id, { status: e.target.value })
      .then((res) => remove(row))
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left">
          {row.userId}
        </TableCell>
        <TableCell align="left">
          {row.prefilterReportScore}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Picture</TableCell>
                    <TableCell>Moderate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell scope="row">
                      <img width="150px" src={`${process.env["REACT_APP_FILESERVER_HOST"]}:${process.env["REACT_APP_FILESERVER_LOCAL_PORT"]}/images/` + row.imagePath} alt="Recieved Pic" />
                    </TableCell>
                    <TableCell align="center">
                      <Stack spacing={2} direction="row">
                        <Button onClick={handleMod} variant="contained" color="success" value="Accepted">
                          Accept
                        </Button>
                        <Button onClick={handleMod} variant="contained" color="error" value="Rejected">
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
