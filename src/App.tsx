import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BottomNavigation from './components/BottomNavigation';
import Dashboard from './components/Dashboard';
import LightsPage from './components/LightsPage';
import ThermostatPage from './components/ThermostatPage';
import SecurityPage from './components/SecurityPage';
import SettingsPage from './components/SettingsPage';
import { Room, UserProfile, ThermostatSettings } from './types';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.darkMode || false;
      }
    } catch (error) {
      console.error('Error loading dark mode setting:', error);
    }
    return false;
  });
  
  const [textSize, setTextSize] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.textSize || 100;
      }
    } catch (error) {
      console.error('Error loading text size setting:', error);
    }
    return 100;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        return settings.userProfile || {
          name: 'Иван Иванов',
          email: 'ivan@example.com',
          avatar: 'https://via.placeholder.com/150',
        };
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
    return {
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      avatar: 'https://via.placeholder.com/150',
    };
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

  const [stats] = useState({
    activeDevices: 3,
    totalDevices: 5,
    energyUsage: 75,
  });

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#9c27b0' : '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#b0b0b0' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto Flex", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 16 * (textSize / 100),
      h1: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: `${2 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${1.5 * (textSize / 100)}rem`,
        },
      },
      h2: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: `${1.75 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${1.25 * (textSize / 100)}rem`,
        },
      },
      h3: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: `${1.5 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${1.1 * (textSize / 100)}rem`,
        },
      },
      h4: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: `${1.25 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${1 * (textSize / 100)}rem`,
        },
      },
      h5: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: `${1.1 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${0.9 * (textSize / 100)}rem`,
        },
      },
      h6: {
        fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        fontSize: `${1 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${0.875 * (textSize / 100)}rem`,
        },
      },
      body1: {
        fontSize: `${1 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${0.875 * (textSize / 100)}rem`,
        },
      },
      body2: {
        fontSize: `${0.875 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${0.75 * (textSize / 100)}rem`,
        },
      },
      button: {
        fontSize: `${0.875 * (textSize / 100)}rem`,
        '@media (max-width:600px)': {
          fontSize: `${0.75 * (textSize / 100)}rem`,
        },
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            fontSize: `${16 * (textSize / 100)}px`,
          },
        }),
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
        defaultProps: {
          elevation: darkMode ? 1 : 0,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          track: {
            opacity: 1,
          },
        },
      },
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            borderTop: `1px solid ${darkMode ? '#333333' : '#e0e0e0'}`,
          },
        },
      },
    },
  }), [darkMode, textSize]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Проверяем поддержку Service Worker
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          console.log('Service Worker is ready:', registration);
          
          // Проверяем состояние Service Worker
          if (registration.active) {
            console.log('Service Worker is active');
          }
          if (registration.waiting) {
            console.log('Service Worker is waiting');
          }
        }

        // Проверяем поддержку необходимых API
        if (!('localStorage' in window)) {
          throw new Error('Local storage is not supported');
        }

        // Проверяем поддержку роутинга
        if (!window.location.hash) {
          window.location.hash = '#/';
        }

        setIsInitialized(true);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize app');
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        const settings = {
          darkMode,
          textSize,
          userProfile,
        };
        localStorage.setItem('appSettings', JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }
  }, [isInitialized, darkMode, textSize, userProfile]);

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        p: 2,
        textAlign: 'center'
      }}>
        <Typography color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!isInitialized) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh'
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
      <CssBaseline enableColorScheme />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNavigation />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App; 