import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
    borderRadius: 15,
    margin: "50px 0",
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

const LeaderBoard = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const theme = useTheme();
  useEffect(async () => {
    try {
      const res = await axios.post("/leaderboard/global");
      console.log(res.data.result);
      setData(res.data.result);
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  }, []);
  if (error) return <Err error={error} />;
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Rank</TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <>
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell
                  sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                  <Grid container>
                    <Typography>{row.rank}</Typography>
                  </Grid>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                  <Link href={`/profile/${row._id}`}>
                    <Typography className={classes.name}>{row.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell
                  sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                  <Typography>
                    {Math.round((row.karma + Number.EPSILON) * 100) / 100}
                  </Typography>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderBoard;
