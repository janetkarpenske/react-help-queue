import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

//below: we use a .map loop to loop through the tickets. We pass in index and use it to assign a unique key to help differentiate them
function TicketList(props){
  
    // const myStyledComponentStyles = {
    //   backgroundColor: '#ecf0f1',
    //   fontFamily: 'sans-serif',
    //   paddingTop: '50px'
    // }
  return (
    <React.Fragment>
      
      <hr/>
      {props.ticketList.map((ticket, index) =>
        <Ticket names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}/>
      )}
      
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array
};

export default TicketList;