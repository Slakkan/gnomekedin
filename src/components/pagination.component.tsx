

import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import '../styles/pagination.styles.scss';

import { appConfig } from '../settings/app.settings';
import { GlobalState } from '../models/state.model';
import { changePage, getGnomesData } from '../store/actions/user.actions';

interface Props {
  currentPage: number,
  totalPages: number,
  changePage: (newPageIndex: number) => void;
}
interface State {
  pagesBefore: number,
  pagesAfter: number;
  subscriptions: Subscription[];
}

class Pagination extends React.Component<Props, State> {
  state: State = {
    pagesBefore: 0,
    pagesAfter: 0,
    subscriptions: []
  };

  componentDidMount() {
    this.configurePaginator();
    const subscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => this.configurePaginator());
    this.setState((previousState) => ({ ...previousState, subscriptions: [subscription] }));
  }

  componentWillUnmount() {
    this.state.subscriptions.forEach(sub => sub.unsubscribe);
  }

  configurePaginator() {
    let config: any;
    if (window.innerWidth < 576) {
      config = appConfig.paginator.mobile;
    } else if (window.innerWidth < 768) {
      config = appConfig.paginator.tablet;
    } else {
      config = appConfig.paginator.desktop;
    }
    const { amountOfPagesBeforeCurrent, amountOfPagesAfterCurrent } = config;
    this.setState((previousState) => ({
      ...previousState,
      pagesBefore: amountOfPagesBeforeCurrent,
      pagesAfter: amountOfPagesAfterCurrent
    }));
  }

  getLinks() {
    const links: JSX.Element[] = [];

    const pagesPreviousToCurrentPage = Math.max(
      this.props.currentPage - this.state.pagesBefore, 0
    );
    const pagesAfterCurrentPage = Math.min(
      this.props.currentPage + this.state.pagesAfter, this.props.totalPages - 1
    );
    for (let i = pagesPreviousToCurrentPage; i <= pagesAfterCurrentPage; i++) {
      const jsx = (
        <li key={i} className={i === this.props.currentPage ? "page-item active" : "page-item"}>
          <a className="pagination__link page-link" onClick={() => this.props.changePage(i)}>
            {i + 1}
          </a>
        </li>
      );
      links.push(jsx);
    }
    return links;
  }

  getThreeDots() {
    return (
      <li className="page-item disabled">
        <a className="pagination__link page-link" href="#">...</a>
      </li>
    );
  }
  render() {
    return (
      <div>
        <nav aria-label="...">
          <ul className="pagination m-0 p-2">
            <li className={this.props.currentPage === 0 ? "page-item disabled" : "page-item"}>
              <a className="pagination__link page-link" onClick={() => this.props.changePage(this.props.currentPage - 1)}>
                Previous
              </a>
            </li>
            {this.props.currentPage > this.state.pagesBefore ? this.getThreeDots() : ''}
            {...this.getLinks()}
            {this.props.currentPage < this.props.totalPages - this.state.pagesAfter ? this.getThreeDots() : ''}
            <li className={this.props.currentPage === this.props.totalPages - 1 ? "page-item disabled" : "page-item"}>
              <a className="pagination__link page-link" onClick={() => this.props.changePage(this.props.currentPage + 1)}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  currentPage: state.userReducer.currentPageIndexFilter,
  totalPages: state.userReducer.totalPages
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePage: (newPageIndex: number) => {
    dispatch(changePage(newPageIndex))
    dispatch<any>(getGnomesData(newPageIndex))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
