import * as React from 'react';
import { Link } from 'react-router-dom';

import '../styles/header.styles.scss';

export interface HeaderProps {
}

export interface HeaderState {
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <div className='header p-2 p-md-3'>
        <div className="row container m-2 p-0">
          <h1 className='header__title col-12 m-0 p-0 d-flex align-items-end'>
            <span>Gnomeked</span><span className="header__title--in">in</span>
          </h1>
          <h3 className='header__subtitle col-12 my-2 m-0 p-0'>Find the right gnome for your party</h3>
        </div>
        <nav className='row container m-2 p-0'>
          <div className='col-2 p-0'><Link className='nav-bar__item' to={'/'}> Home </Link></div>
          <div className='col-2 p-0'><Link className='nav-bar__item' to={'/control'}>Control Panel </Link></div>
        </nav>
      </div>
    );
  }
}