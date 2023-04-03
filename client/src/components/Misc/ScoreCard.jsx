import { alpha, Box, SvgIcon, Typography, useTheme } from "@mui/material";

const ScoreCard = (props) => {
  const theme = useTheme();
  const radius = 10;
  const circum = 2 * Math.PI * radius;
  const val = (props.value / 100) * circum;
  const sz = props.size || 40;

  const getColor = (val) => {
    if (val < circum / 4) return theme.palette.error.main;
    if (val < (circum * 3) / 4) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  return (
    <Box>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <SvgIcon
          sx={{
            fontSize: sz,
            transform: "rotate(-90deg)",
            transition: "all 1s ease-in-out",
          }}
        >
          <circle
            r={radius}
            cx={12}
            cy={12}
            fill="transparent"
            strokeWidth={1.5}
            stroke={
              theme.palette.mode === "dark"
                ? alpha(theme.palette.common.white, 0.25)
                : alpha(theme.palette.common.black, 0.15)
            }
            strokeDasharray={circum}
            strokeLinecap="round"
          />
          <circle
            r={radius}
            cx={12}
            cy={12}
            fill="transparent"
            strokeWidth={2}
            stroke={getColor(val)}
            strokeDasharray={val + " " + circum}
            strokeLinecap="round"
          />
        </SvgIcon>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary" sx={{ fontWeight: "bold" }}>
            {Math.round(props.value)}
          </Typography>
        </Box>
      </Box>
      <Typography color="primary" variant="h5">
        {props.title}
      </Typography>
    </Box>
  );
};

export default ScoreCard;
