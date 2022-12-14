import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import ScienceIcon from '@mui/icons-material/Science';
import ScreenSearchDesktop from '@mui/icons-material/ScreenSearchDesktop';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NavMenu from './NavMenu';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const drawerWidth = 270;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const newBadge = {
    '&.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary.css-10hburv-MuiTypography-root::after': {
        content: '"new"',
        position: 'absolute',
        fontSize: '9px',
        borderRadius: '5px',
        background: '#1976d2',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.2 0.8',
        marginLeft: '5px',
    }
}


const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default function Navigation() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const activePath = useLocation().pathname
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [itemExpanded, setItemExpanded] = useState(true)
    const expandNestedItem = () => {
        setItemExpanded(!itemExpanded);
    };

    return (
        <Box sx={{ display: 'flex' }}>

            <AppBar
                position="fixed"
                open={open}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Publicis Search Intelligence
                    </Typography>
                    <NavMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ pt: 0 }}>
                    <ListItemButton onClick={expandNestedItem} disableRipple>
                        <ListItemIcon>
                            <ScreenSearchDesktop />
                        </ListItemIcon>
                        <ListItemText primary="Search Suggestions" />
                        {itemExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={itemExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 3 }} onClick={() => navigate('/explore-suggestions')} selected={activePath === '/explore-suggestions'}>
                                <ListItemIcon>
                                    <TravelExploreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Explore Suggestions" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 3 }} onClick={() => navigate('/timelines')} selected={activePath === '/saved-keywords'}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText sx={{
                                    '& .MuiTypography-root.MuiTypography-body1.MuiListItemText-primary.css-10hburv-MuiTypography-root::after': {
                                        content: '"new"',
                                        position: 'absolute',
                                        fontSize: '10px',
                                        borderRadius: '5px',
                                        background: '#1976d2',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        padding: '0.2em 0.8em',
                                        marginLeft: '5px',
                                    }

                                }} primary="My Timelines" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('use-cases')} selected={activePath === '/use-cases'}>
                            <ListItemIcon>
                                <ScienceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Use Cases" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
                <Outlet />
            </Box>
        </Box>
    );
}
