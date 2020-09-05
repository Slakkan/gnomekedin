import * as React from 'react';

import { Header } from '../components/header.component';

export interface HomeProps {
}

export interface HomeState {
}

export class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return (
      <div>
        <Header />
        <div className="m-2 m-md-4 p-0">
          Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
          Fugiat non repudiandae perferendis,
          voluptatem, ad dicta, saepe minus
          dolor debitis sapiente nesciunt accusamus
          illum optio? Eos omnis quas officiis rem iusto.
        </div>
      </div>
    );
  }
}