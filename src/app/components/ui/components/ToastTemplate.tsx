"use client"
import { Alert, Snackbar } from '@mui/material';
import { useToastStore } from '@/app/store/useToastStore';

export const ToastTemplate = () => {
  const { open, message, severity, hideToast } = useToastStore();

  const handleClose = () => {
    hideToast();
  };

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={5000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled" 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};