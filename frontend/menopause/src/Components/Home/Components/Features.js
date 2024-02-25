import * as React from 'react';
import { FormattedMessage } from "react-intl";

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import {Typography} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Features() {
  return (
    <div>
        <Box
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center', 
                py: 5,
            }}
        >
            <Stack direction="row" spacing={2} sx={{  
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center', 
                py: 10,
                px: 5,
            }}>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        <FormattedMessage id="home.features.item1Title" defaultMessage="Symptom Recording" />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedMessage id="home.features.item1Subtitle" 
                        defaultMessage="Capturing Your Journey, Detail by Detail" />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <FormattedMessage id="home.features.item1Description" 
                        defaultMessage="Document and analyze symptoms, noting nuances like 
                        severity and impact for a comprehensive health overview." />   
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        <FormattedMessage id="home.features.item2Title" defaultMessage="Recommendations Engine" />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedMessage id="home.features.item2Subtitle" 
                        defaultMessage="Tailored Guidance for Your Journey" />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <FormattedMessage id="home.features.item2Description" 
                        defaultMessage="Personalized suggestions to navigate menopause 
                        symptoms, supporting your unique experience." />
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        <FormattedMessage id="home.features.item3Title" defaultMessage="Pattern Identification " />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedMessage id="home.features.item3Subtitle" 
                        defaultMessage="Insightful Trends at Your Fingertips" />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <FormattedMessage id="home.features.item3Description" 
                        defaultMessage="Identify and understand recurring patterns 
                        in your symptoms, empowering proactive management." />
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        <FormattedMessage id="home.features.item4Title" defaultMessage="Daily Reminders" />
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <FormattedMessage id="home.features.item4Subtitle" 
                        defaultMessage="Stay On Track, Every Day" />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <FormattedMessage id="home.features.item4Description" 
                        defaultMessage="Set reminders for consistent symptom tracking, 
                        ensuring a comprehensive record for better analysis and management." />
                    </Typography>
                </Item>
            </Stack>
        </Box>
      
    </div>
  );
}