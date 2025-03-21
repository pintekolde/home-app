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
    : theme.palette.mode === 'dark'
      ? '#1e1e1e'
      : '#ffffff',
  color: isActive ? '#fff' : theme.palette.text.primary,
  border: isActive ? 'none' : `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    backgroundColor: theme.palette.mode === 'dark'
      ? '#2c2c2c'
      : '#f5f5f5',
  },
  '@media (max-width:600px)': {
    padding: theme.spacing(1.5),
    '&:hover': {
      transform: 'none',
    },
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
  '@media (max-width:600px)': {
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    borderRadius: '16px',
  },
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
    <Box sx={{ pb: { xs: 8, sm: 7 } }}>
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home APP
        </Typography>
      </Box>
      
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.lights}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <LightbulbIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                <Typography variant="h6" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Освещение
                </Typography>
              </Box>
              <Switch
                checked={devices.lights}
                onChange={() => onToggleDevice('lights')}
                color="primary"
                size="small"
              />
            </Box>
          </StatusCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.security}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <SecurityIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                <Typography variant="h6" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Безопасность
                </Typography>
              </Box>
              <Switch
                checked={devices.security}
                onChange={() => onToggleDevice('security')}
                color="primary"
                size="small"
              />
            </Box>
          </StatusCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.ac}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <AcUnitIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                <Typography variant="h6" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Кондиционер
                </Typography>
              </Box>
              <Switch
                checked={devices.ac}
                onChange={() => onToggleDevice('ac')}
                color="primary"
                size="small"
              />
            </Box>
          </StatusCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.router}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <WifiIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                <Typography variant="h6" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Роутер
                </Typography>
              </Box>
              <Switch
                checked={devices.router}
                onChange={() => onToggleDevice('router')}
                color="primary"
                size="small"
              />
            </Box>
          </StatusCard>
        </Grid>
      </Grid>

      <ThermostatCard>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <ThermostatIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
            <Typography variant="h6" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Термостат
            </Typography>
          </Box>
          <Switch
            checked={devices.thermostat}
            onChange={() => onToggleDevice('thermostat')}
            color="primary"
            size="small"
          />
        </Box>
        <Box sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}>
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
                height: { xs: 20, sm: 24 },
                width: { xs: 20, sm: 24 },
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
                height: { xs: 6, sm: 8 },
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </ThermostatCard>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: { xs: 1.5, sm: 2 }, mt: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Активные устройства
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(activeRooms / totalRooms) * 100}
              sx={{ height: { xs: 8, sm: 10 }, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {activeRooms}/{totalRooms}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard; 