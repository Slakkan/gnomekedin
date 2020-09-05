import * as React from 'react';

import { Header } from '../components/header.component';

export interface NotFoundProps {
}

export interface NotFoundState {
}

export class NotFound extends React.Component<NotFoundProps, NotFoundState> {
  render() {
    return (
      <div>
        <Header />
        <div className='m-2 m-md-4 p-0'>
          It seems you are lost adventurer... <a href="/">click here!</a> to go home
        </div>
      </div>
    );
  }
}