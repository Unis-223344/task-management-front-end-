import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./index.css"

class MyVerticallyCenteredModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible:true,
            task: '',
            employeeID: '',
            description: this.props.prop[2],
            attachment: '',
            selectedCreateDate:"",
            selectedAssignedDate: '',
            assignedStatus: '',
            selectedWorkCompleteDate: '',
            completeStatus: '',
            employeeComment: '',
            managerComment: this.props.prop[3],
            isDescriptionEditable: false,
            isAttachmentEditable: false,
            isManagerCommentEditable: false
        };
    }

    postUpdateApiTask = async ()=>{
        const postData = {
            "idNum":this.props.prop[0],
            "taskNum":this.props.prop[1],
            "taskDiscription1":this.state.description,
            "pdfFile1":this.state.attachment,
            "managerComment1":this.state.managerComment
        }
        
        if(this.state.description === "" && this.state.managerComment === ""){
            alert("Required Description or Manager Field")
        }else{
            const url = "http://localhost:4000/updateTaskAssigned2"
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(postData),
            }
            const response = await fetch(url,options)
            const data3 = await response.json()
            if (response.status === 201) {
                alert("Task Updated successfully")
                this.props.onHide()
                this.props.onHide4(data3)
            }
        }
  }
 
    handleFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            attachment: file || '',
            attachmentFormat: file?.type || ''
        });
        this.setState({selectedCreateDate: new Date().toLocaleString()})
    };


  render() {
    const {
        isVisible,
        isEditing,
        task,
        employeeID,
        description,
        attachment,
        attachmentFormat,
        employeeComment,
        managerComment,
        selectedCreateDate,
        selectedAssignedDate,
        selectedWorkCompleteDate,
        assignedStatus,
    } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="resizable-window01">
                    <div className="container02">
                        <div className="form-group03">
                            <label htmlFor="task">Task:</label>
                            <input
                                type="text"
                                id="task"
                                className='input0011'
                                value={this.props.prop[1].slice(30,36)}
                                onChange={(e) => this.setState({ task: e.target.value })}
                                disabled={true} // Always disabled
                            />
                        </div>
                        <div className="form-group04">
                            <label htmlFor="employeeID">Employee ID:</label>
                            <input
                                type="text"
                                id="employeeID"
                                className='input0012'
                                value={this.props.prop[0]}
                                onChange={(e) => this.setState({ employeeID: e.target.value })}
                                disabled={true} // Always disabled
                            />
                        </div>
                        <div className="form-group05">
                            <label htmlFor="description"><span className='colorRed'>*</span>Description:</label>
                            <textarea
                                id="description"
                                className='input00771'
                                value={description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                                onMouseEnter={() => this.setState({ isDescriptionEditable: true })}
                                onMouseLeave={() => this.setState({ isDescriptionEditable: false })}
                            />
                        </div>

                        <div className="form-group13">
                            <label className='inputhgff0011' htmlFor="managerComment">Manager Comment:</label>
                            <textarea
                                id="managerComment"
                                className='input001gfdd1'
                                value={managerComment}
                                onChange={(e) => this.setState({ managerComment: e.target.value })}
                                onMouseEnter={() => this.setState({ isManagerCommentEditable: true })}
                                onMouseLeave={() => this.setState({ isManagerCommentEditable: false })}
                               
                            />
                        </div>
                    </div>
                </div>
            
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.postUpdateApiTask}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyVerticallyCenteredModal;