import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Slider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
} from '@mui/material';
import { UserProfile } from '../types';

interface SettingsPageProps {
  userProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
  textSize: number;
  onTextSizeChange: (size: number) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  userProfile,
  onProfileChange,
  darkMode,
  onDarkModeChange,
  textSize,
  onTextSizeChange,
}) => {
  return (
    <Box sx={{ pb: 7 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={userProfile.avatar}
            alt={userProfile.name}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <TextField
              label="Имя"
              value={userProfile.name}
              onChange={(e) => onProfileChange({ ...userProfile, name: e.target.value })}
              fullWidth
              size="small"
            />
            <TextField
              label="Email"
              value={userProfile.email}
              onChange={(e) => onProfileChange({ ...userProfile, email: e.target.value })}
              fullWidth
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Доступность
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Увеличенный текст"
              secondary="Увеличить размер текста для удобства чтения"
            />
            <Box sx={{ width: 200 }}>
              <Slider
                value={textSize}
                onChange={(_, value) => onTextSizeChange(value as number)}
                min={80}
                max={200}
                step={10}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
            </Box>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Темная тема"
              secondary="Включить темную тему для комфортного использования в темноте"
            />
            <Switch
              checked={darkMode}
              onChange={(e) => onDarkModeChange(e.target.checked)}
              color="primary"
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default SettingsPage; 