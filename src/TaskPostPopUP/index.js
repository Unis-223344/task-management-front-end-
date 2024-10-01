import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./index.css"
import { IoCloseSharp } from "react-icons/io5";
import AdminTaskDashboardWrapper from '../components/Admin';

class TaskPostApiPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addData:[],
            isVisible: true,
            isEditing: false,
            task: '',
            employeeID: '',
            description: '',
            attachment: '',
            attachmentFormat: '',
            employeeComment: '',
            managerComment: '',
            selectedCreateDate: '',
            selectedAssignedDate: '',
            selectedWorkCompleteDate: '',
            assignedStatus: '',
            completeStatus: 'Not Completed',
            isDescriptionEditable: false,
            isAttachmentEditable: false,
            isManagerCommentEditable: false
        };
    }
 
    handleSubmit = async () => {
        const {
            task, employeeID, description, attachment, attachmentFormat, employeeComment,
            managerComment, selectedCreateDate, selectedAssignedDate, selectedWorkCompleteDate,
            assignedStatus, completeStatus
        } = this.state;
 
        const postData = {
            taskNumber1: "",
            role1:this.props.prop[1],
            employeeName1: this.props.prop[2],
            employeeId1: this.props.prop[0],
            taskDiscription1: this.state.description,
            pdfFile1: this.state.attachment,
            taskCreateTime1: new Date().toLocaleString(),
            taskAssignedTime1: this.state.selectedAssignedDate,
            assignedStatus1: this.state.assignedStatus,
            completeDateTime1: this.state.selectedWorkCompleteDate,
            completeStatus1: this.state.completeStatus,
            employeeComment1: this.state.employeeComment,
            managerComment1: this.state.managerComment
        }

        if(this.state.description !== "" && this.attachment !== ""){
            const url = "https://unis-task-manager.onrender.com/taskAssignPost"
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                Accept: 'application/json',
                },
                body: JSON.stringify(postData),
            }
            const response = await fetch(url,options)
            const data = await response.json()
            if (response.status === 201) {
                alert("Task added successfully")
                this.props.onHide2(data)
                this.setState({description: ""})
                this.setState({managerComment: ""})
                this.setState({attachment:""})
                this.setState({addData: data})
            }
        }else{
            alert("Description and Attachment are required fields")
        }
    };
 
    handleFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({
            attachment: file.name || '',
            attachmentFormat: file?.type || ''
        });
    };
 
    handleDateChange = (type, event) => {
        const indianDate = new Date(event.target.value).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        this.setState({ [type]: indianDate });
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
        addData
    } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='setHeaderAl'>
          <Modal.Title id="contained-modal-title-vcenter">
            POST TASK
          </Modal.Title>
          <Button onClick={this.props.onHide3}>X</Button>
        </Modal.Header>
        <Modal.Body>
                <div className="resizable-window0123">
                    <div className="container02">
                        <div className="form-group0423">
                            <label htmlFor="employeeID">Employee ID:</label>
                            <input
                                type="text"
                                id="employeeID"
                                value={this.props.prop[0]}
                                onChange={(e) => this.setState({ employeeID: e.target.value })}
                                disabled={true} // Always disabled
                            />
                        </div>
                        <div className="form-group0523">
                            <label htmlFor="description"> <span className='colorRed'>*</span>Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                                onMouseEnter={() => this.setState({ isDescriptionEditable: true })}
                                onMouseLeave={() => this.setState({ isDescriptionEditable: false })}
                            />
                        </div>
                       
                        <div className="form-group1323">
                            <label htmlFor="managerComment">Manager Comment:</label>
                            <textarea
                                id="managerComment"
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
          <Button variant="primary" onClick={this.handleSubmit}>
                              Submit
                            </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TaskPostApiPopUp;
