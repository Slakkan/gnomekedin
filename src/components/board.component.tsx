import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState } from '../models/state.model';
import { Dispatch } from 'redux';
import { User } from '../models/data/user.model';
import Card from './card.component';

interface BoardProps {
  gnomes: User[];
}
interface BoardState { }

class Board extends React.Component<BoardProps, BoardState> {

  render() {
    return (
      <div className="row container-fluid">
        {this.props.gnomes.map((gnome) => <div key={gnome.id} className="col-10 col-md-4 col-lg-3 col-xl-2"><Card gnome={gnome} /></div>)}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  gnomes: state.userReducer.gnomes
});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
