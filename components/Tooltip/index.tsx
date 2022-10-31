import { Zoom } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

interface Props extends TooltipProps {
  children: React.ReactElement;
}

export const Tooltips = styled(
  ({ placement, title, className, ...props }: Props) => (
    <Tooltip
      title={title}
      placement={placement}
      classes={{ popper: className }}
      TransitionComponent={Zoom}
      {...props}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: "1rem",
    zindex: 10,
    maxWidth: 600,
    fontWeight: "500",
    fontFamily: "Rubik",
    letterSpacing: "-0.25px",
    border: "1px solid var(--gray-100)",
    color: "var(--gray-100)",
    padding: theme.spacing(1),
    backgroundColor: "var(--swamp-green)",
    fontSize: theme.typography.pxToRem(12),
  },
}));
