import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Grid,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SecurityIcon from '@mui/icons-material/Security';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { Devices } from '../types';

const StatusCard = styled(Paper)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(1.5),
  minHeight: '100px',
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
    padding: theme.spacing(1),
    minHeight: '80px',
  },
}));

const ThermostatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
    : 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
  color: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const activeRooms = React.useMemo(() => 
    rooms.filter(room => room.isOn).length,
    [rooms]
  );
  const totalRooms = rooms.length;

  return (
    <Box 
      component="main"
      role="main"
      sx={{ pb: { xs: 7, sm: 6 }, px: { xs: 1, sm: 1.5 } }}
    >
      <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Home APP
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 1, sm: 1.5 }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatusCard isActive={devices.lights}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={0.5}>
                <LightbulbIcon 
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                  aria-hidden="true"
                />
                <Typography variant={isMobile ? "body1" : "h6"}>Свет</Typography>
              </Box>
              <Switch
                checked={devices.lights}
                onChange={() => onToggleDevice('lights')}
                color="primary"
                size={isMobile ? "small" : "medium"}
                aria-label="Переключить свет"
              />
            </Box>
          </StatusCard>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <StatusCard isActive={devices.security}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={0.5}>
                <SecurityIcon 
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                  aria-hidden="true"
                />
                <Typography variant={isMobile ? "body1" : "h6"}>Охрана</Typography>
              </Box>
              <Switch
                checked={devices.security}
                onChange={() => onToggleDevice('security')}
                color="primary"
                size={isMobile ? "small" : "medium"}
                aria-label="Переключить охрану"
              />
            </Box>
          </StatusCard>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <StatusCard isActive={devices.ac}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={0.5}>
                <AcUnitIcon 
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                  aria-hidden="true"
                />
                <Typography variant={isMobile ? "body1" : "h6"}>AC</Typography>
              </Box>
              <Switch
                checked={devices.ac}
                onChange={() => onToggleDevice('ac')}
                color="primary"
                size={isMobile ? "small" : "medium"}
                aria-label="Переключить кондиционер"
              />
            </Box>
          </StatusCard>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <StatusCard isActive={devices.router}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={0.5}>
                <WifiIcon 
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                  aria-hidden="true"
                />
                <Typography variant={isMobile ? "body1" : "h6"}>Wi-Fi</Typography>
              </Box>
              <Switch
                checked={devices.router}
                onChange={() => onToggleDevice('router')}
                color="primary"
                size={isMobile ? "small" : "medium"}
                aria-label="Переключить Wi-Fi"
              />
            </Box>
          </StatusCard>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: { xs: 0.5, sm: 1 } }}>
        <Grid item xs={12} sm={6}>
          <ThermostatCard>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <ThermostatIcon 
                  sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
                  aria-hidden="true"
                />
                <Typography variant={isMobile ? "body1" : "h6"}>Термостат</Typography>
              </Box>
              <Switch
                checked={devices.thermostat}
                onChange={() => onToggleDevice('thermostat')}
                color="primary"
                size={isMobile ? "small" : "medium"}
                aria-label="Переключить термостат"
              />
            </Box>
            <Box sx={{ px: { xs: 0.5, sm: 1 } }}>
              <Typography 
                variant="h4" 
                align="center" 
                sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                aria-label={`Температура ${temperature} градусов`}
              >
                {temperature}°C
              </Typography>
            </Box>
          </ThermostatCard>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper 
            sx={{ p: { xs: 1, sm: 1.5 }, height: '100%' }}
            role="region"
            aria-label="Статистика активных устройств"
          >
            <Typography variant={isMobile ? "body1" : "h6"} gutterBottom>
              Активные устройства
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1, mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(activeRooms / totalRooms) * 100}
                  sx={{
                    height: { xs: 6, sm: 8 },
                    borderRadius: 3,
                    backgroundColor: theme => theme.palette.mode === 'dark' ? '#333' : '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: theme => theme.palette.mode === 'dark' ? '#9c27b0' : '#2196f3',
                    },
                  }}
                  aria-label={`${activeRooms} из ${totalRooms} устройств активны`}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {activeRooms}/{totalRooms}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 