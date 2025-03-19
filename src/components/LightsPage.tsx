import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Room } from '../types';

const RoomCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
    : 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
  color: '#fff',
  borderRadius: '20px',
}));

const ModeButton = styled(IconButton)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: isActive ? '#fff' : theme.palette.text.primary,
  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

interface LightsPageProps {
  rooms: Room[];
  currentRoom: string;
  onRoomChange: (roomId: string) => void;
  onToggleRoom: (roomId: string) => void;
  onBrightnessChange: (roomId: string, value: number) => void;
  onModeChange: (roomId: string, mode: 'day' | 'night' | 'auto') => void;
}

const LightsPage: React.FC<LightsPageProps> = ({
  rooms,
  currentRoom,
  onRoomChange,
  onToggleRoom,
  onBrightnessChange,
  onModeChange,
}) => {
  const currentRoomData = rooms.find(room => room.id === currentRoom);

  return (
    <Box sx={{ pb: 7 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Комната</InputLabel>
          <Select
            value={currentRoom}
            onChange={(e) => onRoomChange(e.target.value)}
            label="Комната"
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {currentRoomData && (
        <RoomCard>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">{currentRoomData.name}</Typography>
            <Switch
              checked={currentRoomData.isOn}
              onChange={() => onToggleRoom(currentRoomData.id)}
              color="primary"
            />
          </Box>

          <Typography gutterBottom>Яркость</Typography>
          <Slider
            value={currentRoomData.brightness}
            onChange={(_, value) => onBrightnessChange(currentRoomData.id, value as number)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth>
            <InputLabel>Режим</InputLabel>
            <Select
              value={currentRoomData.mode}
              onChange={(e) => onModeChange(currentRoomData.id, e.target.value as 'day' | 'night' | 'auto')}
              label="Режим"
            >
              <MenuItem value="day">День</MenuItem>
              <MenuItem value="night">Ночь</MenuItem>
              <MenuItem value="auto">Авто</MenuItem>
            </Select>
          </FormControl>
        </RoomCard>
      )}
    </Box>
  );
};

export default LightsPage; 