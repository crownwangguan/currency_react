import React, { Component } from 'react';
import Routes from './routes'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './App.css';
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://140.238.145.70/">
      BigDataBlog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
class App extends Component {
  
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes />
          <Copyright />
        </ThemeProvider>
      </div>
    )
  }
}

export default App;
