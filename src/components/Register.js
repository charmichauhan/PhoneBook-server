import React from 'react';
// import {  reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register} from '../actions/userActions'
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Register extends React.Component{
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this)
    }

    handleChangeDOB(date) {
        this.setState({
            startDate: date
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        debugger
        event.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;
        const Moment = this.state.startDate;
        const dob = Moment._d;
        user.DOB = dob;
         // const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.password && user.PhoneNumber && user.DOB) {
            debugger
            this.props.register(user);
        }
    }

    render(){
        const {  registering } = this.props;
        const { user, submitted } = this.state;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h2>Register here...</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input ref="firstName" type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input ref="lastName" type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input ref="password" type="password" className="form-control" name="password" value={user.password}  onChange={this.handleChange} />
                        {submitted && !user.password  &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.PhoneNumber ? ' has-error' : '')}>
                        <label htmlFor="PhoneNumber">Phone Number</label>
                        <input  style={{height:'35px', width:'100%'}}  id="PhoneNumber" type="tel" pattern="^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$"  className="form-control" name="PhoneNumber" onChange={this.handleChange} required/>
                        {submitted && !user.PhoneNumber  &&
                        <div className="help-block">Phone Number is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.DOB ? ' has-error' : '')}>
                        <label htmlFor="birthdate">Birth Date</label>
                        <DatePicker
                            className="setheight"
                            fixedHeight = {true}
                            selected={this.state.startDate}
                            onChange={this.handleChangeDOB }
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <button className="btn btn-red">Cancel</button>
                    </div>
                    {registering &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    <div className="form-group">
                        <p style={{float:'left'}}>Already have an account?</p>
                        <Link style={{float:'center'}} to="/" className="btn btn-link">LogIn</Link>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({register},dispatch);
}

export default connect(mapStateToProps,  {register})(Register);