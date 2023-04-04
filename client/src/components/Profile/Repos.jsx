import {
  Box,
  Button,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import ForkLeftIcon from "@mui/icons-material/ForkLeft";
import StarIcon from "@mui/icons-material/Star";

// Title, Description, Stars, Forks
const Repos = ({ repos, handle }) => {
  return (
    <Grid container>
      {repos.map((r, i) => (
        <Grid item key={i} xs={12} sm={6} lg={4} sx={{ p: 1 }}>
          <Link
            href={`https://github.com/${handle}/${r.Title}`}
            sx={{ textDecoration: "none" }}
          >
            <ListItemButton
              sx={{ height: "100%", display: "flex", alignItems: "flex-start" }}
            >
              <Typography sx={{ mr: "auto" }}>{r.Title}</Typography>
              <Box display="flex" alignItems="center" sx={{ pl: 1 }}>
                <ForkLeftIcon sx={{ fontSize: 12 }} />
                <Typography variant="caption">{r.Forks}</Typography>
              </Box>
              <Box display="flex" alignItems="center" sx={{ pl: 1 }}>
                <StarIcon sx={{ fontSize: 12 }} />
                <Typography variant="caption">{r.Stars}</Typography>
              </Box>
            </ListItemButton>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Repos;
