import {AppBar, Toolbar, IconButton, Drawer, Box} from '@mui/material'

<AppBar position="static">
    <Toolbar>

        {/* hamburger icon shows the drawer on click */}
        <IconButton 
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2, display: { xs: 'block', sm: 'none',}, }}>   
          
        </IconButton>

        {/* The outside of the drawer */}
        <Drawer
          
          anchor="right" //from which side the drawer slides in

          variant="temporary" //if and how easily the drawer can be closed

          open={open} //if open is true, drawer is shown
          
          onClose={toggleDrawer(false)} //function that is called when the drawer should close
          
          onOpen={toggleDrawer(true)} //function that is called when the drawer should open
        >
            
            <Box>
              {/* The inside of the drawer */}
            </Box>
        </Drawer>

      </Toolbar>
</AppBar>