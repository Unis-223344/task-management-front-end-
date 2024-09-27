import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class CompleteWorkStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empCommentIn:""
        }
      }



    taskStatusUpdate = async (idProp,idProp2) =>{
        const url = "http://localhost:4000/updateCreateStatus"
        const bodyData = {
            "idNum":idProp2,
            "taskId2":idProp,
            "completedTime2": new Date().toLocaleString(),
            "status2":"Completed",
            "empComment2":this.state.empCommentIn
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(bodyData),
        }

        if(this.state.empCommentIn === ""){
          alert("Enter Employee comment field")
        }else{
          const response = await fetch(url,options)
          const data = await response.json()
          if (response.status === 201){
            this.props.addDataFunction(data)
            this.props.onHide()
            alert("Task submitted successfully")
          }
        }
    }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Work Complete Status & Comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <input type="text" onChange={ (e) => this.setState({empCommentIn:e.target.value})} />
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={ () => this.taskStatusUpdate(this.props.addProp,this.props.addProp2)} >Submit</Button>
          {/* <Button onClick={this.props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CompleteWorkStatus;
