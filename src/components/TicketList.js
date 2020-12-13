import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";
//add for firebase
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

//below: we use a .map loop to loop through the tickets. We pass in index and use it to assign a unique key to help differentiate them
function TicketList(props){

  useFirestoreConnect([
    { collection: 'tickets' }
  ]);

    // The useSelector() hook comes from react-redux.
    const tickets = useSelector(state => state.firestore.ordered.tickets);

    // react-redux-firebase also offers a useful isLoaded() function.
    if (isLoaded(tickets)) {
      return (
        <React.Fragment>
          <hr/>
          {tickets.map((ticket) => {
            return <Ticket
              whenTicketClicked = { props.onTicketSelection }
              names={ticket.names}
              location={ticket.location}
              issue={ticket.issue}
              formattedWaitTime={ticket.formattedWaitTime}
              id={ticket.id}
              key={ticket.id}/>
          })}
        </React.Fragment>
      );
    // If the tickets aren't loaded yet, our fragment will return a "Loading..." message.
    } else {
  return (
    <React.Fragment>
      <h3>Loading...</h3>
    </React.Fragment>
  );
}
}

TicketList.propTypes = {
  //ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;