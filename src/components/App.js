// applicationCache.js is the parent component for all other components in our application

import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl"; 
//Above: Ticket control is the parent of NewTicketForm and TicketList so we only import this.

function App(){
  return ( 
    <React.Fragment>
      <Header />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;