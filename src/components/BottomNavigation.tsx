import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.appBar,
}));

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledBottomNavigation
      value={location.pathname}
      onChange={(_, newValue) => {
        navigate(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Главная"
        value="/"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Освещение"
        value="/lights"
        icon={<LightbulbIcon />}
      />
      <BottomNavigationAction
        label="Термостат"
        value="/thermostat"
        icon={<ThermostatIcon />}
      />
      <BottomNavigationAction
        label="Безопасность"
        value="/security"
        icon={<SecurityIcon />}
      />
      <BottomNavigationAction
        label="Настройки"
        value="/settings"
        icon={<SettingsIcon />}
      />
    </StyledBottomNavigation>
  );
};

export default BottomNav; 