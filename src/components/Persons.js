import React, { Component } from 'react';
import PersonRow from './PersonRow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAll, Delete} from '../actions/userActions';

class Persons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterlastName: "",
            filterDOB: "",
            filterPhoneNumber: "",
            filterText: "",
            sortBy: null,
            sortDir: null,
        }
        this.onPersonTableUpdate=this.handlePersonTable.bind(this);
        this.onRowAdd=this.handleAddEvent.bind(this);
        // this.onRowDel=this.handleRowDel.bind(this);
        this.handleUserInput=this.handleUserInput.bind(this);
        this.handleLNInput=this.handleLNInput.bind(this);
        this.handleDOBInput=this.handleDOBInput.bind(this);
        this.handlePNInput=this.handlePNInput.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.changeFilterlName=this.changeFilterlName.bind(this);
        this.changeFilterDOB=this.changeFilterDOB.bind(this);
        this.changeFilterPhone=this.changeFilterPhone.bind(this);
        this._sortRowsBy=this._sortRowsBy.bind(this)
    }

    componentDidMount(){
        debugger
        this.props.getAll()
    }
    handleDeleteUser(_id) {
        debugger
        return (e) => this.props.Delete(_id);
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    }
    handleLNInput(filterlastName) {
        this.setState({filterlastName: filterlastName});
    };
    handleDOBInput(filterDOB) {
        this.setState({filterDOB: filterDOB});
    };
    handlePNInput(filterPhoneNumber) {
        this.setState({filterPhoneNumber: filterPhoneNumber});
    };
    handleChange() {
        this.handleUserInput(this.refs.filterInput.value);
    }
    changeFilterlName = () => {
        this.handleLNInput(this.refs.filterLNInput.value);
    }
    changeFilterDOB = () => {
        this.handleDOBInput(this.refs.filterDOBInput.value);
    }
    changeFilterPhone = () => {
        this.handlePNInput(this.refs.filterPNInput.value);
    }

    // handleRowDel(person) {
    //     debugger;
    //     // this.props.deleteData();
    //     var item = JSON.parse(localStorage.getItem('myData'))
    //     console.log('item',item);
    //     var index = -1;
    //     var clength = item.persons.length;
    //     for( var i = 0; i < clength; i++ ) {
    //         if(  item.persons[i].id === person.id ) {
    //             index = i;
    //             break;
    //         }
    //     }
    //     item.persons.splice( index, 1 );
    //     this.setState( item );
    //     console.log('item-del',item)
    //     localStorage.setItem('myData', JSON.stringify(item));
    // };

    handleAddEvent() {
        debugger;
        const {users} = this.props;
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        console.log('id',id)
        var person = {
            id: id,
            firstName: "",
            lastName: "",
            DOB: '',
            PhoneNumber: "",
        }
        users.items && users.items.push(person);
        this.setState(users);
        // this.props.addData();
    }
    handlePersonTable(evt) {
        const {users} = this.props;
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var persons = users.items && users.items.slice();
        var newPersons = persons.map(function(person) {
            for (var key in person) {
                if (key === item.name && person.id === item.id) {
                    person[key] = item.value;
                }
            }
            return person;
        });
        this.setState({users: newPersons});
    };
    _sortRowsBy=(cellDataKey)=>{
        debugger
        const {users} = this.props;
        var self = this;
        console.log('cellData',cellDataKey)
        var sortDir = this.state.sortDir;
        console.log('sortDir',sortDir)
        var sortBy = cellDataKey;
        console.log('sortBy',sortBy)
        if (sortBy === this.state.sortBy) {
            sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
        }
        else {
            sortDir = 'DESC';
        }
        var rows = users.items && users.items.slice();
        var rows1 = rows.sort(function(a, b){
            var sortVal = 0;
            console.log('sortBya===',a[sortBy]);
            console.log('sortByb===',b[sortBy]);
            if (a[sortBy] > b[sortBy]) {
                sortVal = 1;
            }
            if (a[sortBy] < b[sortBy]) {
                sortVal = -1;
            }
            if (sortDir === 'DESC') {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });
        self.setState({
            users : rows1,
            sortBy,
            sortDir
        });
        let sortedDOB;
        if(sortBy === 'DOB'){
            debugger
            if (sortDir === 'ASC') {
                sortedDOB = rows.sort((a, b) => Date.parse(new Date(a.DOB.split("/").reverse().join("-"))) - Date.parse(new Date(b.DOB.split("/").reverse().join("-"))));
                console.log('sortedDOB', sortedDOB)
            }
            else{
                sortedDOB = rows.sort((a, b) => Date.parse(new Date(a.DOB.split("/").reverse().join("-"))) - Date.parse(new Date(b.DOB.split("/").reverse().join("-")))).reverse();
                console.log('sortedDOB', sortedDOB)
            }
        }
        self.setState({
            users : sortedDOB,
            sortBy,
            sortDir
        });
    };

    render() {
        const {users} = this.props;
        debugger
        var onPersonTableUpdate = this.onPersonTableUpdate;
        const self = this;
        console.log('users=---=-==-=', users.items);
        var user = users.items &&
                        users.items.map(function(user) {
                        if ( ( user.firstName.toLowerCase().indexOf(self.state.filterText.toLowerCase()) ||
                                user.lastName.toLowerCase().indexOf(self.state.filterlastName.toLowerCase()) ||
                                user.DOB.indexOf(self.state.filterDOB)
                                // ||  user.PhoneNumber.indexOf(self.state.filterPhoneNumber)
                            ) === -1)
                        {return}
                        else return (<PersonRow onPersonTableUpdate={onPersonTableUpdate} user={user}
                                                key={user.id}
                                                // onDelEvent={rowDel.bind(this)}
                                                />)
        });

        var sortDirArrow = "";
        console.log('this.state.sortDir',this.state.sortDir)
        if (this.state.sortDir !== null) {
            sortDirArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
            console.log('sortDirArrow', sortDirArrow)
        }
        return (
            <div>
                <h2>PhoneBook Application</h2>
                <div>
                    <button type="button" onClick={this.onRowAdd} className="btn btn-primary pull-right"
                            style={{marginRight:'200px'}}>Add</button>
                     <table id="customers">
                         <tr style={{border:'1px solid #ddd'}}>
                             <td>
                                 <a onClick={()=>this._sortRowsBy('firstName')}><th>{'First Name' + (this.state.sortBy === 'firstName' ? sortDirArrow : '')}</th></a>
                             </td>
                             <td>
                                 <a onClick={()=>this._sortRowsBy('lastName')}><th>{'Last Name' + (this.state.sortBy === 'lastName' ? sortDirArrow : '')}</th></a>
                             </td>
                             <td>
                                 <a onClick={()=>this._sortRowsBy('DOB')}><th>{'DOB' + (this.state.sortBy === 'DOB' ? sortDirArrow : '')}</th></a>
                             </td>
                             <td>
                                 <a onClick={()=>this._sortRowsBy('PhoneNumber')}><th>{'Phone Number' + (this.state.sortBy === 'PhoneNumber' ? sortDirArrow : '')}</th></a>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 <input className="cellContainer" type="text" placeholder="Search firstName..." value={this.state.filterText}
                                        ref="filterInput" onChange={this.handleChange.bind(this)}/>
                             </td>
                             <td>
                                 <input  type="text" placeholder="Search lastName..." value={this.state.filterlastName}
                                         ref="filterLNInput" onChange={this.changeFilterlName.bind(this)}/>
                             </td>
                             <td>
                                 <input  type="number" placeholder="Search DOB..." value={this.state.filterDOB}
                                         ref="filterDOBInput" onChange={this.changeFilterDOB.bind(this)}/>
                             </td>
                             <td>
                                 <input type="number" placeholder="Search PhoneNumber..." value={this.state.filterPhoneNumber}
                                        ref="filterPNInput" onChange={this.changeFilterPhone.bind(this)}/>
                             </td>
                         </tr>
                         <tr>
                             <td>
                                 {users.loading && <em>Loading users...</em>}
                                 {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                 {users.items &&
                                <div>
                                    {users.items.map((user, index) =>
                                        <div >
                                            <br/>
                                            {user.firstName}
                                        </div>
                                    )}
                                </div>
                                }
                             </td>
                             <td>
                                 {users.loading && <em>Loading users...</em>}
                                 {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                 {users.items &&
                        <div>
                            {users.items.map((user, index) =>
                                <div key={user._id}>
                                    <br/>
                                    {user.lastName}
                                </div>
                            )}
                        </div>
                        }
                             </td>
                             <td>
                                 {users.loading && <em>Loading users...</em>}
                                 {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                 {users.items &&
                                 <div>
                                     {users.items.map((user, index) =>
                                         <div key={user._id}>
                                             <br/>
                                             {user.DOB}
                                         </div>
                                     )}
                                 </div>
                                 }
                             </td>
                             <td >
                                 {users.loading && <em>Loading users...</em>}
                                 {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                 {users.items &&
                                 <div>
                                     {users.items.map((user, index) =>
                                         <div key={user._id}>
                                             <br/>
                                             {user.PhoneNumber}
                                         </div>
                                     )}
                                 </div>
                                 }
                             </td>
                             <td>
                                 {users.loading && <em>Loading users...</em>}
                                 {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                 {users.items &&
                                 <div>
                                     {users.items.map((user, index) =>
                                        <div key={user._id}>
                                             <br/>
                                             {
                                                 user.deleting ? <em> - Deleting...</em>
                                                     : user.deleteError ?
                                                     <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                     : <span> < a onClick={this.handleDeleteUser(user._id)}>
                                                                         <i className="fontColor">Delete</i>
                                                                     </a></span>
                                             }
                                         </div>
                                     )}
                                 </div>
                                 }
                            </td>
                         </tr>
                     </table>
                </div>
            </div>
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
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAll, Delete}, dispatch);
}
export default connect(mapStateToProps, {getAll, Delete})(Persons)
