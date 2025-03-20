import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SecurityIcon from '@mui/icons-material/Security';
import { styled } from '@mui/material/styles';

import BottomNavigation from './components/BottomNavigation';
import Dashboard from './components/Dashboard';
import LightsPage from './components/LightsPage';
import ThermostatPage from './components/ThermostatPage';
import SecurityPage from './components/SecurityPage';
import SettingsPage from './components/SettingsPage';
import { Room, DeviceInfo, UserProfile, Devices, Camera, ThermostatSettings } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto Flex", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

interface DeviceCardProps {
  title: string;
  icon: React.ReactNode;
  isOn: boolean;
  onToggle: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ title, icon, isOn, onToggle }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Switch checked={isOn} onChange={onToggle} />
      </Box>
    </CardContent>
  </StyledCard>
);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState(100);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: 'https://via.placeholder.com/150',
  });
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Гостиная', deviceId: 'light1', isOn: true, brightness: 80, mode: 'auto' },
    { id: '2', name: 'Спальня', deviceId: 'light2', isOn: false, brightness: 60, mode: 'night' },
    { id: '3', name: 'Кухня', deviceId: 'light3', isOn: true, brightness: 100, mode: 'day' },
    { id: '4', name: 'Ванная', deviceId: 'light4', isOn: false, brightness: 50, mode: 'auto' },
  ]);

  const [currentRoom, setCurrentRoom] = useState('1');
  const [temperature, setTemperature] = useState(22);
  const [isOn, setIsOn] = useState(true);
  const [mode, setMode] = useState<ThermostatSettings['mode']>('off');
  const [timer, setTimer] = useState(0);

  const [devices, setDevices] = useState({
    lights: true,
    thermostat: true,
    security: true,
    ac: false,
    router: true,
  });

  const [stats, setStats] = useState({
    activeDevices: 3,
    totalDevices: 5,
    energyUsage: 75,
  });

  const handleToggleDevice = (device: keyof typeof devices) => {
    setDevices(prev => ({
      ...prev,
      [device]: !prev[device]
    }));
  };

  const handleToggleRoom = (roomId: string) => {
    setRooms((prev: Room[]) =>
      prev.map((room: Room) =>
        room.id === roomId ? { ...room, isOn: !room.isOn } : room
      )
    );
  };

  const handleBrightnessChange = (roomId: string, value: number) => {
    setRooms((prev: Room[]) =>
      prev.map((room: Room) =>
        room.id === roomId ? { ...room, brightness: value } : room
      )
    );
  };

  const handleModeChange = (roomId: string, mode: 'day' | 'night' | 'auto') => {
    setRooms((prev: Room[]) =>
      prev.map((room: Room) =>
        room.id === roomId ? { ...room, mode } : room
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ pb: 7 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  rooms={rooms}
                  devices={devices}
                  stats={stats}
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  onToggleDevice={handleToggleDevice}
                />
              } 
            />
            <Route
              path="/lights"
              element={
                <LightsPage
                  rooms={rooms}
                  currentRoom={currentRoom}
                  onRoomChange={setCurrentRoom}
                  onToggleRoom={handleToggleRoom}
                  onBrightnessChange={handleBrightnessChange}
                  onModeChange={handleModeChange}
                />
              }
            />
            <Route
              path="/thermostat"
              element={
                <ThermostatPage
                  rooms={rooms}
                  currentRoom={currentRoom}
                  onRoomChange={setCurrentRoom}
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  isOn={isOn}
                  onToggle={() => setIsOn(!isOn)}
                  mode={mode}
                  onModeChange={setMode}
                  timer={timer}
                  onTimerChange={setTimer}
                />
              }
            />
            <Route
              path="/security"
              element={
                <SecurityPage
                  cameras={[
                    { id: '1', name: 'Вход', room: 'Гостиная', isActive: true, streamUrl: 'https://example.com/stream1' },
                    { id: '2', name: 'Кухня', room: 'Кухня', isActive: false, streamUrl: 'https://example.com/stream2' },
                  ]}
                  onCameraSelect={() => {}}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  userProfile={userProfile}
                  onProfileChange={setUserProfile}
                  darkMode={darkMode}
                  onDarkModeChange={setDarkMode}
                  textSize={textSize}
                  onTextSizeChange={setTextSize}
                />
              }
            />
          </Routes>
          <BottomNavigation />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App; 