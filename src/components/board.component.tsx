import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../models/state.model';
import { Dispatch } from 'redux';
import { User } from '../models/data/user.model';
import Card from './card.component';
import Pagination from './pagination.component';
import Loading from './loading.component';

interface BoardProps {
  isBoardLoading: boolean;
  gnomes: User[];
}
interface BoardState { }

class Board extends React.Component<BoardProps, BoardState> {

  render() {
    return (
      <div className="d-flex h-100 flex-column align-items-center">
        <div className="mt-2 mt-md-3 mt-lg-4">
          <Pagination />
        </div>
        <div className="flex-grow-1 d-flex align-items-center">
          {this.props.isBoardLoading ? <Loading /> : (
            <div className="row container-fluid p-0">
              {this.props.gnomes.map((gnome) => <div key={gnome.id} className="col-10 col-md-4 col-lg-3 col-xl-2"><Card gnome={gnome} /></div>)}
            </div>
          )}
        </div>
        <div className="mb-2 mb-md-3 mb-lg-4">
          <Pagination />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isBoardLoading: state.appReducer.isBoardLoading,
  gnomes: state.userReducer.gnomes
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Board);