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
import { alpha } from '@mui/material/styles';

const SettingsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const SettingsSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.main,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
    },
  },
  '& .MuiSlider-track': {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSlider-rail': {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.primary.main, 0.3)
      : alpha(theme.palette.primary.main, 0.2),
  },
  '& .MuiSlider-mark': {
    backgroundColor: theme.palette.text.secondary,
    height: 8,
    width: 2,
    '&.MuiSlider-markActive': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: theme.palette.primary.main,
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
    if (typeof value === 'number') {
      onTextSizeChange(value);
    }
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDarkModeChange(event.target.checked);
  };

  const handleProfileChange = (field: keyof UserProfile) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onProfileChange({
      ...userProfile,
      [field]: event.target.value,
    });
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
              onChange={handleProfileChange('name')}
              margin="dense"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              value={userProfile.email}
              onChange={handleProfileChange('email')}
              margin="dense"
              variant="outlined"
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
              onChange={handleDarkModeChange}
              color="primary"
            />
          }
          label="Темная тема"
        />
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            Размер текста ({textSize}%)
          </Typography>
          <StyledSlider
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
          />
        </Box>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default SettingsPage; 