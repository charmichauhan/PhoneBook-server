import React from 'react';
// import {Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { update, getById} from "../actions/userActions"
import {bindActionCreators} from 'redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {reactLocalStorage} from 'reactjs-localstorage';
import 'react-datepicker/dist/react-datepicker.css';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                password: '',
                DOB:'',
                PhoneNumber:7584589925,
            },
            submitted: false,
            startDate: moment(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange1(date) {
        this.setState({
            startDate: date
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        debugger
        const {user} = this.state;
        this.setState({ submitted: true });
        const Moment = this.state.startDate;
        const dob = Moment._d;
        user.DOB = dob;
        if (user.firstName && user.lastName && user.password && user.PhoneNumber && user.DOB) {
            debugger
            this.props.update(user);
        }
    }
    //updateUser() {
    // const {user} = this.props;
    // var persons = JSON.parse(localStorage.user);
    // console.log('persons', persons)
    // console.log('user', user.user)
    // localStorage.setItem("user", JSON.stringify(user));  //put the object back
    // }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        //const user = reactLocalStorage.getObject('user');
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    // reset(){
    //     console.log('');
    //     debugger
    //     this.refs.firstName.value="";
    //     this.refs.lastName.value="";
    //     this.refs.password.value="";
    //     this.refs.DOB.value="";
    //     this.refs.PhoneNumber.value="";
    // }
    render() {
        const user = reactLocalStorage.getObject('user');
        console.log('user',user)
        //const getUsername = ({input}) => {
        //     const user = reactLocalStorage.getObject('user');
        //     for (var prop in user.user) {
        //         //console.log('  ' + prop + ': ' + user.user[prop]);
        //         console.log('---',user.user.username)
        //     }
        // }
        const {  submitted } = this.state;
        return (
            <div className="container">
                    <div className="col-md-6 col-md-offset-3">
                        <br/>
                        <h2>Update your profile here...</h2>
                        <form  onSubmit={this.handleSubmit}>

                            <div className={'form-group' + (submitted && !this.state.user.firstName ? ' has-error' : '')}>
                                <label htmlFor="firstName">First Name</label>
                                <input ref="firstName" type="text" className="form-control" name="firstName" value={this.state.user.firstName || user.user.firstName} onChange={this.handleChange}/>
                                {submitted && !this.state.user.firstName &&
                                <div className="help-block">First Name is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !this.state.user.lastName ? ' has-error' : '')}>
                                <label htmlFor="lastName">Last Name</label>
                                <input ref="lastName" type="text" className="form-control" name="lastName" value={this.state.user.lastName || user.user.lastName} onChange={this.handleChange}/>
                                {submitted && !this.state.user.lastName &&
                                <div className="help-block">Last Name is required</div>
                                }
                            </div>

                            <div className  ={'form-group' + (submitted && !this.state.user.password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input ref="password" type="password" className="form-control" name="password" value={this.state.user.password || user.user.password}  onChange={this.handleChange} />
                                {submitted && !this.state.user.password  &&
                                <div className="help-block">Password is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !this.state.user.PhoneNumber ? ' has-error' : '')}>
                                <label htmlFor="PhoneNumber">Phone Number</label>
                                <input  style={{height:'35px', width:'100%'}}  id="PhoneNumber" type="tel" pattern="^\d{10}"  value={this.state.user.PhoneNumber || user.user.PhoneNumber} className="form-control" name="PhoneNumber" onChange={this.handleChange} required/>
                                {submitted && !this.state.user.PhoneNumber  &&
                                <div className="help-block">Phone Number is required</div>
                                }
                            </div>


                            <div className={'form-group' + (submitted && !user.DOB ? ' has-error' : '')}>
                                <label htmlFor="birthdate">Birth Date</label>
                                <DatePicker
                                    className="setheight"
                                    fixedHeight = {true}
                                    selected={this.state.startDate}
                                    onChange={this.handleChange1 }
                                />
                            </div>


                            <div className="form-group">
                                <button className="btn btn-primary">Update</button>
                                {/*<button className="btn btn-red" onClick={this.reset}>Cancel</button>*/}
                            </div>
                        </form>
                    </div>
            </div>

        );
    }
}

// EditProfile = reduxForm({
//     form: 'UpdateForm',
//     destroyOnUnmount:false
// })(EditProfile);

function mapStateToProps(state) {
    const {  users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({update, getById}, dispatch);
}
export default connect(mapStateToProps, {update, getById})(EditProfile)