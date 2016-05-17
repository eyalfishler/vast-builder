import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './form.jsx';

// App component - represents the whole app
export default class App extends Component {
  renderForm() {
    return <Form />;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className='container'>
          {this.renderForm()}
        </div>
      </MuiThemeProvider>
    );
  }
}
