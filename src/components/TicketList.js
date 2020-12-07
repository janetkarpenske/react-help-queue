import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

//below: we use a .map loop to loop through the tickets. We pass in index and use it to assign a unique key to help differentiate them
function TicketList(props){
  return (
    <React.Fragment>
      
      <hr/>
      {Object.values(props.ticketList).map((ticket) =>
        <Ticket 
        //Below line passes props.onTicketSelection down to Ticket component as a prop so that Ticket componenet can handle determining if it's been clicked on. onTicketSelection was passed down TicketControl as a prop of TicketControl and it is now being renamed as whenTicketClicked and passed down further to Ticket as a prop.
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;