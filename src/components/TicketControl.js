//Parent control for new ticket form and ticketlist
//Ticket Control has two states: TicketList is showing and NewTicketForm is hidden, and vice versa

import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import * as a from './../actions';
//added for firebase
import { withFirestore } from 'react-redux-firebase'

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // formVisibleOnPage: false,
      // masterTicketList: [],
      selectedTicket: null,
      editing: false
    };
    //Line above: sets the default state to be that the list is showing but the form is hidden
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    
    } else {
      const { dispatch } = this.props;
      //The a in the line below is because when we imported the actions we told them to be referred to as a in the import statement!
      const action = a.toggleForm();
      dispatch(action);
    }
  }
  handleAddingNewTicketToList = (newTicket) => {
    // const { dispatch } = this.props;
    // const action = a.addTicket(newTicket);
    // dispatch(action);
    // const action2 = a.toggleForm();
    // dispatch(action2);
    //Old code commented out because firestore is handling it. This is what's left of the code:
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({collection: 'tickets', doc: id}).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket });
    });
  }
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }
  // handleEditingTicketInList = (ticketToEdit) => {
  //   const { dispatch } = this.props;
  //   const action = a.addTicket(ticketToEdit);
  //   dispatch(action);
  //   this.setState({
  //     editing: false,
  //     selectedTicket: null
  //   });
  // }


  render(){
    let currentlyVisibleState = null;
    let buttonText = null; // new code
    //Below: Handles what happens if a ticket has been clicked to view the details
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList}/>
      buttonText = "Return to Ticket List";
    }
    else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick}/>
      buttonText = "Return to Ticket List";
    }
    //Below: Handles what happens if the button to add a ticket has been clicked
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List"; // new code
    } else {
      //Below: Handles how the page looks if the list of tickets should be displayed. This is also the default state.
      //Line below: Calls TicketList Function, passing in current state of masterTicketList
      //Line Below explanation: 'We are saving the value of this.handleChangingSelectedTicket in the onTicketSelection prop.
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket"; // new code
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}
TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    //masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}
TicketControl = connect(mapStateToProps)(TicketControl);

export default withFirestore(TicketControl);