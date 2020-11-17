//Parent control for new ticket form and ticketlist
//Ticket Control has two states: TicketList is showing and NewTicketForm is hidden, and vice versa

import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      masterTicketList: []
    };
    //Line above: sets the default state to be that the list is showing but the form is hidden
  }

  handleClick = () => { 
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    this.setState({masterTicketList: newMasterTicketList,
    formVisibleOnPage: false });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null; // new code
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List"; // new code
    } else {
      //Line below: Calls TicketList Function, passing in current state of masterTicketList
      currentlyVisibleState = <TicketList ticketList={this.state.masterTicketList}/>;
      buttonText = "Add Ticket"; // new code
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> { /* new code */ }
      </React.Fragment>
    );
  }

}

export default TicketControl;