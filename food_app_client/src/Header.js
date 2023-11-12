import AppBar from '@mui/material/AppBar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <div className='Header'>
      <AppBar position="relative">
        <Toolbar>
          <FastfoodIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Food Image Classifier
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}