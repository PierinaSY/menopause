import * as React from "react";
import { FormattedMessage } from "react-intl";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssistantIcon from "@mui/icons-material/Assistant";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


export default function Main(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        gap: "1rem",
      }}
    >
      <Typography variant="h2" gutterBottom>
        <FormattedMessage id="main.welcome" defaultMessage="Welcome " />
         {props.name}!
      </Typography>
      <Typography variant="h4" gutterBottom>
        <FormattedMessage id="main.title" defaultMessage="Let’s get started" />
      </Typography>
      <Stack spacing={2} sx={{ width: "100%", textAlign: "center" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          component={Link}
          to="/track"
        >
          <FormattedMessage id="main.button0" defaultMessage="Record your symptoms" />
        </Button>
        <Button
          variant="contained"
          startIcon={<AssistantIcon />}
          component={Link}
          to="/recommendations"
        >
          <FormattedMessage id="main.button1" defaultMessage="Get recommendations" />
        </Button>
        <Button
          variant="contained"
          startIcon={<QueryStatsIcon />}
          component={Link}
          to="/patterns"
          >
          <FormattedMessage id="main.button2" defaultMessage="See patterns on your journey" />
        </Button>
      </Stack>
    </Box>
  );
}
