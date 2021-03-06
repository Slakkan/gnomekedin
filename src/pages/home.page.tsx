import * as React from 'react';

import { Header } from '../components/header.component';
import Board from '../components/board.component';

export interface HomeProps {
}

export interface HomeState {
}

export class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="m-0 m-md-2 p-0 h-100">
          <Board />
        </div>
      </div>
    );
  }
}