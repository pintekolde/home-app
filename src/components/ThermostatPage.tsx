import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TimerIcon from '@mui/icons-material/Timer';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloseIcon from '@mui/icons-material/Close';
import { ThermostatRoom, ThermostatSettings } from '../types';

const FunctionButton = styled(Paper)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: isActive
    ? theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
      : 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)'
    : 'transparent',
  color: isActive ? '#fff' : theme.palette.text.primary,
  border: isActive ? 'none' : `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

interface ThermostatPageProps {
  rooms: ThermostatRoom[];
  currentRoom: string;
  onRoomChange: (roomId: string) => void;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  isOn: boolean;
  onToggle: () => void;
  mode: ThermostatSettings['mode'];
  onModeChange: (mode: ThermostatSettings['mode']) => void;
  timer: number;
  onTimerChange: (minutes: number) => void;
}

const ThermostatPage: React.FC<ThermostatPageProps> = ({
  rooms,
  currentRoom,
  onRoomChange,
  temperature,
  onTemperatureChange,
  isOn,
  onToggle,
  mode,
  onModeChange,
  timer,
  onTimerChange,
}) => {
  const [openDialog, setOpenDialog] = useState<'cool' | 'heat' | 'timer' | null>(null);
  const [tempValue, setTempValue] = useState(temperature);
  const [timerValue, setTimerValue] = useState(timer);

  const handleOpenDialog = (type: 'cool' | 'heat' | 'timer') => {
    setOpenDialog(type);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleSaveSettings = () => {
    if (openDialog === 'cool' || openDialog === 'heat') {
      onTemperatureChange(tempValue);
    } else if (openDialog === 'timer') {
      onTimerChange(timerValue);
    }
    handleCloseDialog();
  };

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
        <Switch checked={isOn} onChange={onToggle} color="primary" />
      </Box>

      <Box display="flex" gap={2}>
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            Температура
          </Typography>
          <Typography variant="h2" align="center" gutterBottom>
            {temperature}°C
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={temperature}
              onChange={(_, value) => onTemperatureChange(value as number)}
              min={16}
              max={30}
              step={0.5}
              orientation="vertical"
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}°C`}
              sx={{
                height: 200,
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: 'inherit',
                  },
                  '&:before': {
                    display: 'none',
                  },
                },
                '& .MuiSlider-track': {
                  width: 8,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </Box>

        <Box flex={1}>
          <FunctionButton
            isActive={mode === 'cool'}
            onClick={() => handleOpenDialog('cool')}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <AcUnitIcon />
              <Typography>Охлаждение</Typography>
            </Box>
          </FunctionButton>

          <FunctionButton
            isActive={mode === 'heat'}
            onClick={() => handleOpenDialog('heat')}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <WbSunnyIcon />
              <Typography>Нагрев</Typography>
            </Box>
          </FunctionButton>

          <FunctionButton
            isActive={timer > 0}
            onClick={() => handleOpenDialog('timer')}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <TimerIcon />
              <Typography>Таймер: {timer} мин</Typography>
            </Box>
          </FunctionButton>
        </Box>
      </Box>

      <Dialog open={openDialog !== null} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>
              {openDialog === 'cool' && 'Настройка охлаждения'}
              {openDialog === 'heat' && 'Настройка нагрева'}
              {openDialog === 'timer' && 'Настройка таймера'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {openDialog === 'timer' ? (
            <TextField
              type="number"
              label="Время (минуты)"
              value={timerValue}
              onChange={(e) => setTimerValue(Number(e.target.value))}
              fullWidth
            />
          ) : (
            <Box sx={{ px: 2, py: 2 }}>
              <Typography gutterBottom>Температура</Typography>
              <Slider
                value={tempValue}
                onChange={(_, value) => setTempValue(value as number)}
                min={16}
                max={30}
                step={0.5}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}°C`}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSaveSettings} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ThermostatPage; 