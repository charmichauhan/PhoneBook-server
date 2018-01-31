import React, { Component } from 'react';
import EditableCell from './EditableCell'
import {connect} from 'react-redux';

class PersonRow extends React.Component {

    render() {
        const {user, users} =  this.props;
        debugger
        return (
            <tr className="eachRow">
                <EditableCell onPersonTableUpdate={this.props.onPersonTableUpdate} cellData={{
                    "type": "firstName",
                    value: user.user.firstName,
                    id: user.user.id
                }}
                />
                <EditableCell onPersonTableUpdate={this.props.onPersonTableUpdate} cellData={{
                    type: "lastName",
                    value: user.user.lastName,
                    id: user.user.id
                }}
                />
                <EditableCell onPersonTableUpdate={this.props.onPersonTableUpdate} cellData={{
                    type: "DOB",
                    value: user.user.DOB,
                    id: user.user.id
                }}
                />
                <EditableCell onPersonTableUpdate={this.props.onPersonTableUpdate} cellData={{
                    type: "PhoneNumber",
                    value: user.user.PhoneNumber,
                    id: user.user.id
                }}
                />

            </tr>
        );
    }
}
function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
    };
}
export default connect(mapStateToProps)(PersonRow);