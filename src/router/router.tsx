import * as React from "react";
import { BrowserRouter, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';

import PublicRoute from './public-route';
import PrivateRoute from './private-route';

// Pages
import { Home } from '../pages/home.page';
import { ControlPanel } from '../pages/control-panel.page';
import { NotFound } from '../pages/not-found.page';
import { GlobalState } from '../models/state.model';
import { connect } from 'react-redux';
import { getGnomesData } from '../store/actions/user.actions';
import Notifications from '../components/notifications.component';


export interface RouterProps {
  isAdmin?: boolean;
  isNotificationActive: boolean;
  currentNotification: string;
  getGnomes: () => void;
}

export interface RouterState {
}

class Router extends React.Component<RouterProps, RouterState> {
  componentDidMount() {
    this.props.getGnomes();
  }
  render() {
    return (
      <BrowserRouter>
        <Notifications isActive={this.props.isNotificationActive} message={this.props.currentNotification} />
        <Switch>
          <PublicRoute Component={Home} path="/" exact={true} {...this.props} />
          <PrivateRoute
            isAdmin={!!this.props.isAdmin}
            Component={ControlPanel}
            path={"/control"}
            exact={true}
          />
          <PublicRoute Component={NotFound} path={undefined} exact={false} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  return {
    isAdmin: state.userReducer.isAdmin,
    isNotificationActive: state.appReducer.isNotificationActive,
    currentNotification: state.appReducer.currentNotification
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    getGnomes: () => dispatch<any>(getGnomesData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);