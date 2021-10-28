import React, {useState, useEffect} from "react";
import "../Login/login.css";
import {  useHistory  } from 'react-router-dom';
import {  AddNewUser } from '../api/api'

 const Register = ({updateHeader})=> {

    const history = useHistory();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        
        
    }, [])


    const onLoginClick = () => {
        console.log('onLoginClick ',name, userName, password);

        if (userName.trim().length < 6 || password.trim().length < 6 || name.trim().length < 6) {
            console.log('invalid input');
        } else {
            console.log('start register ');

            let params = {
                name: name,
                userName: userName,
                password: password
            }

            AddNewUser(params).then((response)=>{
                let actionResponse = response.data;
                console.log(actionResponse);
                if (response.status === 201) {
                    updateHeader(1)
                    history.push(`/account/${actionResponse.id}/${'123'}`);
                } else {
                    alert('Something went wrong... sorry');
                }
            });

        }

    }


    return(
    <div className="container">
        <div className="form">
         <div className="input-field">
              <label >Name</label>
              <input 
                type="text" 
                placeholder="User Name" 
                id="name" 
                name="name"
                onChange={(e) => {setName(e.target.value)}}/>
          </div>
          <div className="input-field">
              <label >User Name</label>
              <input 
                type="text" 
                placeholder="User Name" 
                id="email" 
                name="email"
                onChange={(e) => {setUserName(e.target.value)}}/>
          </div>
        <div className="input-field">
           <label >Password</label>
           <input 
                type="password" 
                placeholder="********" 
                id="password" 
                name="password"
                onChange={(e) => {setPassword(e.target.value)}}/>
       </div>
       <div className="input-field">
            <label >
                 <input type="checkbox" name="" id="remember"/>Remember me
           </label>
       </div>
       <div className="action">
             <button id="btn" className="btn" onClick={()=> {onLoginClick()}}>Register</button>
           </div>
         </div>
        </div>
    )
}
export default Register ;