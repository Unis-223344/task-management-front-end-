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
            description: '',
            attachment: '',
            selectedCreateDate:"",
            selectedAssignedDate: '',
            assignedStatus: '',
            selectedWorkCompleteDate: '',
            completeStatus: '',
            employeeComment: '',
            managerComment: '',
            isDescriptionEditable: false,
            isAttachmentEditable: false,
            isManagerCommentEditable: false
        };
    }

    postUpdateApiTask = async ()=>{
        const postData = {
            "taskNum":this.props.prop[1],
            "taskDiscription1":this.state.description,
            "pdfFile1":this.state.attachment,
            "managerComment1":this.state.managerComment
        }
        // api call here

        const url = "https://task-management-backend-4.onrender.com/updateTaskAssigned2"
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(postData),
    }
    const response = await fetch(url,options)
    const data = await response.json()
    if (response.status === 201) {
        alert("Task Updated successfully")
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
 
    // handleDateChange = (type, event) => {
    //     const indianDate = new Date(event.target.value).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    //     this.setState({ [type]: indianDate });
    // }
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
                                value={this.props.prop[1]}
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
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                className='input00771'
                                value={description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                                onMouseEnter={() => this.setState({ isDescriptionEditable: true })}
                                onMouseLeave={() => this.setState({ isDescriptionEditable: false })}
                            />
                        </div>
                        <div className="form-group06">
                            <label htmlFor="attachment">Attachment:</label>
                            <input
                            className='input009991'
                                type="file"
                                id="attachment"
                                onChange={this.handleFileChange}
                                onMouseEnter={() => this.setState({ isAttachmentEditable: true })}
                                onMouseLeave={() => this.setState({ isAttachmentEditable: false })}
                            />
                            <span>{attachment && `Selected File: ${attachment} (${attachmentFormat})`}</span>
                        </div>
                        <div className="form-group07">
                            <label className='input005611'>Create Date & Time:</label>
                            <input
                            className='input00988911'
                                type="datetime-local"
                                value={selectedCreateDate}
                                disabled={true} // Always disabled
                            />
                        </div>
                        <div className="form-group08">
                            <label className='input0056711'>Assigned Date & Time:</label>
                            <input
                            className='input0097411'
                                type="datetime-local"
                                value={selectedAssignedDate ? new Date(selectedAssignedDate).toISOString().slice(0, 16) : ''}
                                onChange={(e) => this.handleDateChange('selectedAssignedDate', e)}
                                disabled={true} // Always disabled
                            />
                        </div>
                        <div className="form-group09">
                            <label htmlFor="assignedStatus">Assigned Status:</label>
                            <input
                                type="text"
                                id="assignedStatus"
                                className='input0009811'
                                value={assignedStatus}
                                onChange={(e) => this.setState({ assignedStatus: e.target.value })}
                                disabled={!isEditing} // Editable only in edit mode
                            />
                        </div>
                        <div className="form-group10">
                            <label className='input0010981'>Work Complete Date & Time:</label>
                            <input
                                type="datetime-local"
                                className='input0763011'
                                value={selectedWorkCompleteDate ? new Date(selectedWorkCompleteDate).toISOString().slice(0, 16) : ''}
                                onChange={(e) => this.handleDateChange('selectedWorkCompleteDate', e)}
                                disabled={true} // Always disabled
                            />
                        </div>
                        <div className="form-group12">
                            <label className='input540011' htmlFor="employeeComment">Employee Comment:</label>
                            <textarea
                                id="employeeComment"
                                className='input00789911'
                                value={employeeComment}
                                onChange={(e) => this.setState({ employeeComment: e.target.value })}
                                disabled={!isEditing} // Editable only in edit mode
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
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyVerticallyCenteredModal;
















// import React, { Component } from 'react';
// import './index.css';
// import { isVisible } from '@testing-library/user-event/dist/utils';
 
// class ResizableWindow extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isVisible:true,
    //         task: '',
    //         employeeID: '',
    //         description: '',
    //         attachment: '',
    //         selectedCreateDate:"",
    //         selectedAssignedDate: '',
    //         assignedStatus: '',
    //         selectedWorkCompleteDate: '',
    //         completeStatus: '',
    //         employeeComment: '',
    //         managerComment: '',
    //         isDescriptionEditable: false,
    //         isAttachmentEditable: false,
    //         isManagerCommentEditable: false
    //     };
    // }
 
    // handleSubmit2 = () => {
    //     const {
    //         task, employeeID, description, attachment, attachmentFormat, employeeComment,
    //         managerComment, selectedCreateDate, selectedAssignedDate, selectedWorkCompleteDate,
    //         assignedStatus, completeStatus
    //     } = this.state;
 
    //     const newData = {
    //         task,
    //         employeeID,
    //         description,
    //         attachment,
    //         attachmentFormat,
    //         employeeComment,
    //         managerComment,
    //         selectedCreateDate,
    //         selectedAssignedDate,
    //         selectedWorkCompleteDate,
    //         assignedStatus,
    //         completeStatus
    //     };
 
    //     this.props.onSave(newData);
    //     this.setState({ isEditing: false });
    //     alert(newData)
    // };
 
    // handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     this.setState({
    //         attachment: file?.name || '',
    //         attachmentFormat: file?.type || ''
    //     });
    // };
 
    // handleDateChange = (type, event) => {
    //     const indianDate = new Date(event.target.value).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    //     this.setState({ [type]: indianDate });
    // };
 
//     render() {
        // const {
        //     isVisible,
        //     isEditing,
        //     task,
        //     employeeID,
        //     description,
        //     attachment,
        //     attachmentFormat,
        //     employeeComment,
        //     managerComment,
        //     selectedCreateDate,
        //     selectedAssignedDate,
        //     selectedWorkCompleteDate,
        //     assignedStatus,
        // } = this.state;
 
//         return (
            // isVisible && (
            //     <div className="resizable-window01">
            //         <div className="container02">
            //             <div className="form-group03">
            //                 <label htmlFor="task">Task:</label>
            //                 <input
            //                     type="text"
            //                     id="task"
            //                     value={task}
            //                     onChange={(e) => this.setState({ task: e.target.value })}
            //                     disabled={true} // Always disabled
            //                 />
            //             </div>
            //             <div className="form-group04">
            //                 <label htmlFor="employeeID">Employee ID:</label>
            //                 <input
            //                     type="text"
            //                     id="employeeID"
            //                     value={employeeID}
            //                     onChange={(e) => this.setState({ employeeID: e.target.value })}
            //                     disabled={true} // Always disabled
            //                 />
            //             </div>
            //             <div className="form-group05">
            //                 <label htmlFor="description">Description:</label>
            //                 <textarea
            //                     id="description"
            //                     value={description}
            //                     onChange={(e) => this.setState({ description: e.target.value })}
            //                     onMouseEnter={() => this.setState({ isDescriptionEditable: true })}
            //                     onMouseLeave={() => this.setState({ isDescriptionEditable: false })}
            //                 />
            //             </div>
            //             <div className="form-group06">
            //                 <label htmlFor="attachment">Attachment:</label>
            //                 <input
            //                     type="file"
            //                     id="attachment"
            //                     onChange={this.handleFileChange}
            //                     onMouseEnter={() => this.setState({ isAttachmentEditable: true })}
            //                     onMouseLeave={() => this.setState({ isAttachmentEditable: false })}
            //                 />
            //                 <span>{attachment && `Selected File: ${attachment} (${attachmentFormat})`}</span>
            //             </div>
            //             <div className="form-group07">
            //                 <label>Create Date & Time:</label>
            //                 <input
            //                     type="datetime-local"
            //                     value={selectedCreateDate ? new Date(selectedCreateDate).toISOString().slice(0, 16) : ''}
            //                     onChange={(e) => this.handleDateChange('selectedCreateDate', e)}
            //                     disabled={true} // Always disabled
            //                 />
            //             </div>
            //             <div className="form-group08">
            //                 <label>Assigned Date & Time:</label>
            //                 <input
            //                     type="datetime-local"
            //                     value={selectedAssignedDate ? new Date(selectedAssignedDate).toISOString().slice(0, 16) : ''}
            //                     onChange={(e) => this.handleDateChange('selectedAssignedDate', e)}
            //                     disabled={true} // Always disabled
            //                 />
            //             </div>
            //             <div className="form-group09">
            //                 <label htmlFor="assignedStatus">Assigned Status:</label>
            //                 <input
            //                     type="text"
            //                     id="assignedStatus"
            //                     value={assignedStatus}
            //                     onChange={(e) => this.setState({ assignedStatus: e.target.value })}
            //                     disabled={!isEditing} // Editable only in edit mode
            //                 />
            //             </div>
            //             <div className="form-group10">
            //                 <label>Work Complete Date & Time:</label>
            //                 <input
            //                     type="datetime-local"
            //                     value={selectedWorkCompleteDate ? new Date(selectedWorkCompleteDate).toISOString().slice(0, 16) : ''}
            //                     onChange={(e) => this.handleDateChange('selectedWorkCompleteDate', e)}
            //                     disabled={true} // Always disabled
            //                 />
            //             </div>
            //             <div className="form-group12">
            //                 <label htmlFor="employeeComment">Employee Comment:</label>
            //                 <textarea
            //                     id="employeeComment"
            //                     value={employeeComment}
            //                     onChange={(e) => this.setState({ employeeComment: e.target.value })}
            //                     disabled={!isEditing} // Editable only in edit mode
            //                 />
            //             </div>
            //             <div className="form-group13">
            //                 <label htmlFor="managerComment">Manager Comment:</label>
            //                 <textarea
            //                     id="managerComment"
            //                     value={managerComment}
            //                     onChange={(e) => this.setState({ managerComment: e.target.value })}
            //                     onMouseEnter={() => this.setState({ isManagerCommentEditable: true })}
            //                     onMouseLeave={() => this.setState({ isManagerCommentEditable: false })}
                               
            //                 />
            //             </div>
            //             <button className='button2' onClick={this.handleSubmit2}>Submit</button>
            //         </div>
            //     </div>
            // )
//         );
//     }
// }
 
// export default ResizableWindow;