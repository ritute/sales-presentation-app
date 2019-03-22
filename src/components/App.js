import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CloudinaryContext } from 'cloudinary-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';

import HomeLayout from './Layout/HomeLayout';
import DialogRoot from './Dialog/DialogRoot';
import PresentationList from './PresentationList/PresentationList';
import Presentation from './Presentation/Presentation';
import AssetLibrary from './AssetLibrary/AssetLibrary';
import CustomMuiTheme from '../config/muiTheme';

const theme = createMuiTheme(CustomMuiTheme);

const RouteWithLayout = ({layout, component, ...rest}) => (
  <Route {...rest} render={(props) =>
    React.createElement(layout, props, React.createElement(component, props))
  }/>
);

const App = ({ cloudName, uploadPreset }) => (
  <SnackbarProvider maxSnack={3}>
    <CloudinaryContext cloudName={cloudName} uploadPreset={uploadPreset}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <Switch>
            <RouteWithLayout
              exact
              path="/"
              layout={HomeLayout}
              component={PresentationList}
            />
            <RouteWithLayout
              path="/assets"
              layout={HomeLayout}
              component={AssetLibrary}
            />
            <Route path="/presentations/:id" component={Presentation} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
        <DialogRoot />
      </MuiThemeProvider>
    </CloudinaryContext>
  </SnackbarProvider>
);

App.propTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
};

App.contextTypes = {
  cloudName: PropTypes.string,
  uploadPreset: PropTypes.string,
};

export default App;
