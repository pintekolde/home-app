import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import { Camera } from '../types';

const CameraCard = styled(Paper)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  padding: theme.spacing(2),
  height: '100%',
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

const VideoPreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 300,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface SecurityPageProps {
  cameras: Camera[];
  onCameraSelect: (cameraId: string) => void;
}

const SecurityPage: React.FC<SecurityPageProps> = ({ cameras, onCameraSelect }) => {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const handleCameraClick = (camera: Camera) => {
    setSelectedCamera(camera);
    onCameraSelect(camera.id);
  };

  const handleCloseDialog = () => {
    setSelectedCamera(null);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Typography variant="h4" gutterBottom>
        Система безопасности
      </Typography>

      <Grid container spacing={2}>
        {cameras.map((camera) => (
          <Grid item xs={12} sm={6} key={camera.id}>
            <CameraCard
              isActive={camera.isActive}
              onClick={() => handleCameraClick(camera)}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <VideocamIcon />
                <Typography variant="h6">{camera.name}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Комната: {camera.room}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Статус: {camera.isActive ? 'Активна' : 'Неактивна'}
              </Typography>
            </CameraCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={selectedCamera !== null}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>
              {selectedCamera?.name} - {selectedCamera?.room}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <VideoPreview>
            {selectedCamera?.streamUrl ? (
              <img
                src={selectedCamera.streamUrl}
                alt={selectedCamera.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Typography color="text.secondary">
                Нет доступа к видеопотоку
              </Typography>
            )}
          </VideoPreview>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SecurityPage; 