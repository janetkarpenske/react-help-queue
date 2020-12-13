import React from "react";
// import { v4 } from 'uuid';
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
//Added for firebase
import { useFirestore } from 'react-redux-firebase'

function NewTicketForm(props){
  //one line added for firebase
  const firestore = useFirestore();

  function addTicketToFirestore(event) {
      event.preventDefault();
      //Line is needed to toggle between components but no longer actually handles creating a ticket
      props.onNewTicketCreation();

      return firestore.collection('tickets').add(
        {
          names: event.target.names.value,
          location: event.target.location.value, 
          issue: event.target.issue.value,
          timeOpen: firestore.FieldValue.serverTimestamp()
        }
      );
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;