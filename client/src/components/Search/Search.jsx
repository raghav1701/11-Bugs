import {
  Grid,
  MenuItem,
  Select,
  Card,
  CardContent,
  Box,
  InputLabel,
  TextField,
  Button,
  Typography,
  useTheme,
  List,
  ListItemButton,
  Avatar,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import ScoreCard from "../Misc/ScoreCard";
import Stats from "../Profile/Stats";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    marginBottom: 20,
  },
}));

const Search = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState(false);
  const [data, setData] = useState({});

  const getCapitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const handleQueryChange = (e) => {
    setSearch(false);
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    setSearch(true);
    try {
      const res = await axios.post("/search", { query });
      setData(res.data.user);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <Box>
      <Card className={classes.card}>
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ pl: 1, display: "flex", alignItems: "flex-end" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextField
                  value={query}
                  onChange={handleQueryChange}
                  sx={{ width: "100%" }}
                  placeholder="Try a user handle here..."
                />
                <Button
                  variant="contained"
                  sx={{ ml: 1 }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : search ? (
        <>
          <Stats
            handle={query}
            code={"Github"}
            // userID={null}
            scoreSize={128}
          />
          <Stats
            handle={query}
            code={"Codechef"}
            // userID={null}
            scoreSize={128}
          />
          <Stats
            handle={query}
            code={"Codeforces"}
            // userID={null}
            scoreSize={128}
          />
          {data && data._id && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Link
                  href={`/profile/${data._id}`}
                  sx={{
                    textDecoration: "none",
                    // color: theme.palette.text.primary,
                  }}
                >
                  <ListItemButton>
                    <Grid container>
                      <Grid item>
                        <Avatar src={data.avatar} />
                      </Grid>
                      <Grid item xs={true} sx={{ pl: 2 }}>
                        <Box>
                          <Typography variant="h6">{data.name}</Typography>
                          <Typography variant="caption">
                            {data.username}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <ScoreCard value={data.karma} size={48} />
                      </Grid>
                    </Grid>
                  </ListItemButton>
                </Link>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Typography color={theme.palette.warning.main} align="center">
          Try a search . . .
        </Typography>
      )}
    </Box>
  );
};

export default Search;
