import React, { Component } from 'react';

class EditableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    handleValidation(){
        debugger
        let formIsValid = true;
        if(this.props.cellData.value === '')
        {
            formIsValid = false;
            // this.props.cellData.value = 'Field cannot be empty'
        }
        if(this.props.cellData.type === 'PhoneNumber'){
            if(!this.props.cellData.value.match(/^[789]\d{9}$/)){
                formIsValid = false;
            }
        }
        return formIsValid;
    }
    render() {
        debugger
        return (
            <td>
                <form>
                <input className={this.handleValidation()===false ? "error" : ""} type='text' name={this.props.cellData.type} id={this.props.cellData.id}
                       value={this.props.cellData.value} onChange={this.props.onPersonTableUpdate}/>
                </form>
            </td>
        );
    }
}
export default  EditableCell