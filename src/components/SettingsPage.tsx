import React from 'react';
import {
  Box,
  Typography,
  Switch,
  Slider,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserProfile } from '../types';

const SettingsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  '@media (max-width:600px)': {
    padding: theme.spacing(1.5),
  },
}));

const SettingsSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '@media (max-width:600px)': {
    padding: theme.spacing(1.5),
  },
}));

interface SettingsPageProps {
  userProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  darkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
  textSize: number;
  onTextSizeChange: (value: number) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  userProfile,
  onProfileChange,
  darkMode,
  onDarkModeChange,
  textSize,
  onTextSizeChange,
}) => {
  const handleTextSizeChange = (_: Event, value: number | number[]) => {
    onTextSizeChange(value as number);
  };

  return (
    <SettingsContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Настройки
      </Typography>

      <SettingsSection>
        <Typography variant="h6" gutterBottom>
          Профиль
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={userProfile.avatar}
            alt={userProfile.name}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              label="Имя"
              value={userProfile.name}
              onChange={(e) => onProfileChange({ ...userProfile, name: e.target.value })}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              value={userProfile.email}
              onChange={(e) => onProfileChange({ ...userProfile, email: e.target.value })}
              margin="dense"
            />
          </Box>
        </Box>
      </SettingsSection>

      <SettingsSection>
        <Typography variant="h6" gutterBottom>
          Внешний вид
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(e) => onDarkModeChange(e.target.checked)}
              color="primary"
            />
          }
          label="Темная тема"
        />
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Размер текста ({textSize}%)</Typography>
          <Slider
            value={textSize}
            onChange={handleTextSizeChange}
            min={75}
            max={150}
            step={5}
            marks={[
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
              { value: 150, label: '150%' },
            ]}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': {
                height: 20,
                width: 20,
              },
              '& .MuiSlider-track': {
                height: 6,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default SettingsPage; 