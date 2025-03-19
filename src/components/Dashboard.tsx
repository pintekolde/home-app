import React from 'react';
import { Box, Typography, Grid, Paper, Switch, Slider, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SecurityIcon from '@mui/icons-material/Security';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import { Room } from '../types';

const StatusCard = styled(Paper)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: isActive
    ? theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
      : 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)'
    : 'transparent',
  color: isActive ? '#fff' : theme.palette.text.primary,
  border: isActive ? 'none' : `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ThermostatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: '20px',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
    : 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
  color: '#fff',
}));

interface DashboardProps {
  devices: {
    lights: boolean;
    thermostat: boolean;
    security: boolean;
    ac: boolean;
    router: boolean;
  };
  stats: {
    activeDevices: number;
    totalDevices: number;
    energyUsage: number;
  };
  temperature: number;
  onTemperatureChange: (value: number) => void;
  onToggleDevice: (device: keyof DashboardProps['devices']) => void;
  rooms: Room[];
}

const Dashboard: React.FC<DashboardProps> = ({
  devices,
  stats,
  temperature,
  onTemperatureChange,
  onToggleDevice,
  rooms,
}) => {
  const activeRooms = rooms.filter(room => room.isOn).length;
  const totalRooms = rooms.length;

  return (
    <Box sx={{ pb: 7 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home APP
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StatusCard isActive={devices.lights}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <LightbulbIcon />
                <Typography variant="h6">Освещение</Typography>
              </Box>
              <Switch
                checked={devices.lights}
                onChange={() => onToggleDevice('lights')}
                color="primary"
              />
            </Box>
          </StatusCard>
        </Grid>
        <Grid item xs={6}>
          <StatusCard isActive={devices.security}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <SecurityIcon />
                <Typography variant="h6">Безопасность</Typography>
              </Box>
              <Switch
                checked={devices.security}
                onChange={() => onToggleDevice('security')}
                color="primary"
              />
            </Box>
          </StatusCard>
        </Grid>
        <Grid item xs={6}>
          <StatusCard isActive={devices.ac}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <AcUnitIcon />
                <Typography variant="h6">Кондиционер</Typography>
              </Box>
              <Switch
                checked={devices.ac}
                onChange={() => onToggleDevice('ac')}
                color="primary"
              />
            </Box>
          </StatusCard>
        </Grid>
        <Grid item xs={6}>
          <StatusCard isActive={devices.router}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <WifiIcon />
                <Typography variant="h6">Роутер</Typography>
              </Box>
              <Switch
                checked={devices.router}
                onChange={() => onToggleDevice('router')}
                color="primary"
              />
            </Box>
          </StatusCard>
        </Grid>
      </Grid>

      <ThermostatCard>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <ThermostatIcon />
            <Typography variant="h6">Термостат</Typography>
          </Box>
          <Switch
            checked={devices.thermostat}
            onChange={() => onToggleDevice('thermostat')}
            color="primary"
          />
        </Box>
        <Box sx={{ px: 2 }}>
          <Typography variant="h3" align="center" gutterBottom>
            {temperature}°C
          </Typography>
          <Slider
            value={temperature}
            onChange={(_, value) => onTemperatureChange(value as number)}
            min={16}
            max={30}
            step={0.5}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}°C`}
            sx={{
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
                height: 8,
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </ThermostatCard>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Активные устройства
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(activeRooms / totalRooms) * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {activeRooms}/{totalRooms}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard; 