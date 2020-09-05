import * as React from 'react';

import { Header } from '../components/header.component';

export interface ControlPanelProps {
}

export interface ControlPanelState {
}

export class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
  render() {
    return (
      <div>
        <Header />
        <div className='m-2 m-md-4 p-0'>
          <h1>INSERT CONTROL PANEL HERE</h1>
        </div>
      </div>
    );
  }
}