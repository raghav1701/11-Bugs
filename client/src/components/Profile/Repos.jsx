import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import ForkLeftIcon from "@mui/icons-material/ForkLeft";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material";

// Title, Description, Stars, Forks
const Repos = ({ repos, handle }) => {
  const theme = useTheme();
  return (
    <List>
      {repos.map((r, i) => (
        <>
          <Link
            href={`https://github.com/${handle}/${r.Title}`}
            sx={{
              textDecoration: "none",
              width: "100%",
              color: theme.palette.text.primary,
            }}
          >
            <ListItemButton
              sx={{ height: "100%", display: "flex", alignItems: "flex-start" }}
            >
              <Box sx={{ mr: "auto" }}>
                <Typography sx={{ color: theme.palette.primary.main }}>
                  {r.Title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.disabled }}
                >
                  {r.Description}
                </Typography>
              </Box>
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
          {/* <Divider /> */}
        </>
      ))}
    </List>
  );
};

export default Repos;
