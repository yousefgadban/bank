import React from "react";
import { Link } from "react-router-dom";
import './header.css'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: 0};
    }

    showLink = 0;

    componentDidMount() {
        console.log('headdeeer ');
    }

    componentDidUpdate() {
        this.showLink = this.props.showLinks;
        console.log('componentDidUpdate', this.props.showLinks, this.showLink);
        
    }

  
 
    render() {
        console.log('header render', this.showLink);
        return (
            <div style={{backgroundColor: '#2196f3', width:'100vw', display: 'flex', alignItems: 'center', color: 'white', height: '8vh'}}>
                <div style={{margin: '12px 0px', display: 'flex'}}>
                    <Link className="headerLink" to="/" >Home</Link>
                  
                    <Link  
                        className="headerLink" 
                        to="/manager" 
                        style={{display: this.showLink === 0 && this.props.showLinks < 2 ? 'none' : 'block'}}>Manager</Link>
                    <Link style={{display: this.showLink === 0 && this.props.showLinks > 0 ? 'none' : 'block'}} className="headerLink" to="/register" >Register</Link>
                    <Link style={{display: this.showLink === 0 && this.props.showLinks > 0 ? 'none' : 'block'}} className="headerLink" to="/login" >Login</Link>
                   
                    <Link style={{display: this.props.showLinks !== 0 || this.showLink !== 0  ? 'block' : 'none'}} className="headerLink" to="/" onClick={(e) => {this.props.callAppCompFromHeader(); this.showLink = 0; this.setState({show : 0})}}>Logout</Link>
                </div>
            </div>
        );
    }
}