import * as React from 'react';
import { FormattedMessage } from "react-intl";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

export default function Treatment({ data }) {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '1rem',
        }}
      >
        <Typography variant="h4" gutterBottom>
          <FormattedMessage id="treatment.welcome" defaultMessage="Here are our top suggestions" />
        </Typography>

        {data.symptom_treatments ? (
          data.symptom_treatments.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography>{item.symptom.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {item.treatments.map((treatment, subIndex) => (
                    <div key={subIndex}>
                      <Typography variant="subtitle1" gutterBottom>{treatment.name}</Typography>
                      <Typography variant="body2" gutterBottom>{treatment.description}</Typography>
                    </div>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body1">
            <FormattedMessage id="treatment.empty" defaultMessage="No symptom treatments found." />
          </Typography>
        )}
      </Box>
    </div>
  );
}
