const PRIMARY_COLOUR = '#3A5B78';
const BLUE_GRADIENT = 'linear-gradient(to right, #243949 0%, #517fa4 100%)';

export default {
  palette: {
    primary: {
      main: PRIMARY_COLOUR,
    },
    secondary: {
      main: PRIMARY_COLOUR
    },
    background: {
      default: '#fff',
    }
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: BLUE_GRADIENT,
        '& *': {
          color: '#fff',
        },
      },
    },
    MuiAppBar: {
      colorDefault: {
        boxShadow: 'none',
        backgroundColor: '#fff',
      },
    },
    MuiFab: {
      primary: {
        background: BLUE_GRADIENT,
      },
    },
    MuiList: {
      root: {
        background: BLUE_GRADIENT,
      },
    },
    MuiListItem: {
      root: {
        borderLeft: `2px solid ${PRIMARY_COLOUR}`,
        '&$selected&$button': {
          backgroundColor: '#fff',
          transition: 'background-color 0.5s ease',
          '& *': {
            color: '#000',
          },
        },
        '&$button:hover, &$button:focus': {
          backgroundColor: 'rgba(255,255,255,0.9)',
          transition: 'background-color 0.5s ease',
          '& *': {
            color: '#000',
          },
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: '#fff'
      }
    },
    MuiListItemText: {
      primary: {
        color: '#fff'
      }
    }
  }
};
