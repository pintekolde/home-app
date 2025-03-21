import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Grid,
  LinearProgress,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SecurityIcon from '@mui/icons-material/Security';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Devices } from '../types';

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
    transform: theme.breakpoints.up('sm') ? 'scale(1.02)' : 'none',
    backgroundColor: theme.palette.mode === 'dark'
      ? '#2c2c2c'
      : '#f5f5f5',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const ThermostatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
    : 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
  color: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 1.5,
  },
}));

interface DashboardProps {
  devices: Devices;
  stats: {
    activeDevices: number;
    totalDevices: number;
    energyUsage: number;
  };
  temperature: number;
  onTemperatureChange: (value: number) => void;
  onToggleDevice: (device: keyof Devices) => void;
  rooms: Array<{
    id: string;
    name: string;
    isOn: boolean;
  }>;
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
    <Box sx={{ pb: { xs: 8, sm: 7 }, px: { xs: 1.5, sm: 2 } }}>
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home APP
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.lights}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <LightbulbIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
                <Typography variant="h6">Освещение</Typography>
              </Box>
              <Switch
                checked={devices.lights}
                onChange={() => onToggleDevice('lights')}
                color="primary"
                size="medium"
              />
            </Box>
          </StatusCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.security}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <SecurityIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
                <Typography variant="h6">Безопасность</Typography>
              </Box>
              <Switch
                checked={devices.security}
                onChange={() => onToggleDevice('security')}
                color="primary"
                size="medium"
              />
            </Box>
          </StatusCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.ac}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <AcUnitIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
                <Typography variant="h6">Кондиционер</Typography>
              </Box>
              <Switch
                checked={devices.ac}
                onChange={() => onToggleDevice('ac')}
                color="primary"
                size="medium"
              />
            </Box>
          </StatusCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatusCard isActive={devices.router}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={1}>
                <WifiIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
                <Typography variant="h6">Роутер</Typography>
              </Box>
              <Switch
                checked={devices.router}
                onChange={() => onToggleDevice('router')}
                color="primary"
                size="medium"
              />
            </Box>
          </StatusCard>
        </Grid>
      </Grid>

      <ThermostatCard>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <ThermostatIcon sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
            <Typography variant="h6">Термостат</Typography>
          </Box>
          <Switch
            checked={devices.thermostat}
            onChange={() => onToggleDevice('thermostat')}
            color="primary"
            size="medium"
          />
        </Box>
        <Box sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '3rem' } }}>
            {temperature}°C
          </Typography>
        </Box>
      </ThermostatCard>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mt: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h6" gutterBottom>
          Активные устройства
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(activeRooms / totalRooms) * 100}
              sx={{
                height: { xs: 8, sm: 10 },
                borderRadius: 5,
                backgroundColor: theme => theme.palette.mode === 'dark' ? '#333' : '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme => theme.palette.mode === 'dark' ? '#9c27b0' : '#2196f3',
                },
              }}
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