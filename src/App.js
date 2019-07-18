import React, { Component } from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import { Button, ButtonIcon } from '@rmwc/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { simpleDialogIsOpen: false };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">RMWC + React + Webpack</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Button unelevated><ButtonIcon icon="favorite" />Button</Button>

        <Grid>
          <GridCell span="4">1</GridCell>
          <GridCell span="4">2</GridCell>
          <GridCell span="4">3</GridCell>
        </Grid>

        <Dialog
            open={this.state.standardDialogOpen}
            onClose={evt => {
              console.log(evt.detail.action)
              this.setState({standardDialogOpen: false})
            }}
        >
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogContent>This is a standard dialog.</DialogContent>
          <DialogActions>
            <DialogButton action="close">Cancel</DialogButton>
            <DialogButton action="accept" isDefaultAction>Sweet!</DialogButton>
          </DialogActions>
        </Dialog>

        <Button
            raised
            onClick={evt => this.setState({standardDialogOpen: true})}
        >
          Open standard Dialog
        </Button>
      </div>
    );
  }
}

export default App;
