import { FC } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
type Props = {
  percentage: number;
  variant?: "determinate" | "buffer";
};

const Progress: FC<Props> = ({ percentage = 0, variant = "determinate" }) => {
  return (
    <Box className="mx-auto" sx={{ width: "100%" }}>
      <LinearProgress variant={variant} value={percentage} />
    </Box>
  );
};
export default Progress;
