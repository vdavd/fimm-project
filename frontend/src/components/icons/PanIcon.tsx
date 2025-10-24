import { SvgIcon } from "@mui/material";

const PanIcon = () => {
  return (
    <SvgIcon sx={{ verticalAlign: "middle" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-100 -150 1200 1200"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m1000 350l-187 188 0-125-250 0 0 250 125 0-188 187-187-187 125 0 0-250-250 0 0 125-188-188 186-187 0 125 252 0 0-250-125 0 187-188 188 188-125 0 0 250 250 0 0-126 187 188z"
        />
      </svg>
    </SvgIcon>
  );
};

export default PanIcon;
