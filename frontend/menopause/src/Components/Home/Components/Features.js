import * as React from 'react';
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
                        Symptom Recording
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Capturing Your Journey, Detail by Detail
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Document and analyze symptoms, noting nuances like 
                        severity and impact for a comprehensive health overview.
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        Recommendations Engine 
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Tailored Guidance for Your Journey
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Personalized suggestions to navigate menopause 
                        symptoms, supporting your unique experience.
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        Pattern Identification 
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Insightful Trends at Your Fingertips
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Identify and understand recurring patterns 
                        in your symptoms, empowering proactive management.
                    </Typography>
                </Item>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        Daily Reminders  
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Stay On Track, Every Day
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                    Set reminders for consistent symptom tracking, 
                    ensuring a comprehensive record for better analysis and management.
                    </Typography>
                </Item>
            </Stack>
        </Box>
      
    </div>
  );
}