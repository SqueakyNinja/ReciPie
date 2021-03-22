import { Box, LinearProgress, Typography } from "@material-ui/core";

function Loadingbar({ progress }) {
  const normalise = (value) => ((value - 0) * 100) / (1 - 0);

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={2}>
        <LinearProgress variant="determinate" value={normalise(progress)} />
      </Box>
      <Box minWidth={35}>
        <Typography color="secondary">{`${Math.round(normalise(progress))}%`}</Typography>
      </Box>
    </Box>
  );
}

export default Loadingbar;
