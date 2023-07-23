import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Grid,
  Typography,
  Divider,
  useTheme,
  Link,
} from "@mui/material";
import axios from "axios";
import Err from "../Misc/Err";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    // borderRadius: 15,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const LeaderBoard = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const { type } = props;
  const [rowsperpage, setRowsperpage] = useState(3);
  const theme = useTheme();

  const handleChangeRowsPerPage = (e) => {
    setRowsperpage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const fetchData = async () => {
    try {
      const res = await axios.post(`/leaderboard/${type}`);
      console.log(res.data.result);
      setData(res.data.result);
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);
  if (error) return <Err error={error} />;
  return (
    <TableContainer className={classes.tableContainer} sx={{ py: 2 }}>
      <Table
        aria-label="simple table"
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Rank</TableCell>
            <TableCell className={classes.tableHeaderCell}>Username</TableCell>
            <TableCell className={classes.tableHeaderCell}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsperpage, page * rowsperpage + rowsperpage)
            .map((row, i) => (
              <>
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Grid container>
                      <Typography>{row.rank}</Typography>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/${row._id}`}>
                      <Typography className={classes.name}>
                        {row.username}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {Math.round((row.karma + Number.EPSILON) * 100) / 100}
                    </Typography>
                  </TableCell>
                </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component={"div"}
        rowsPerPageOptions={[3]}
        colSpan={3}
        count={data.length}
        rowsPerPage={rowsperpage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default LeaderBoard;
