import React, { useState } from "react";
import Header from "./Header/header";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login/Login";
import './App.css';
import { Account } from "./Account/Account";
import { Manager } from "./manager/Manager";
import Register from "./register/register";
import Home from "./Home/Home"



// history.push({
//     pathname: '/users',
//     state: {
//       name: name,
//       age: age,
//       country: country,
//       reg: true
//     }
//   })

// const history = useHistory();
// history.location.state



function App() {

    const [updateUI, setUpdateUI] = useState(0);

    const updateHeader = (id) => {
        console.log('fromAppFunction');
        setUpdateUI(id);
    }

    const callAppCompFromHeader = () => {
        console.log('callAppCompFromHeader');
        setUpdateUI(0)
    }

    return (
        <div >   
            <BrowserRouter>
                <div>
                    <Header showLinks={updateUI} callAppCompFromHeader={callAppCompFromHeader} />
                    {/* <Route path="/" exact component={HomePage} />
                    <Route path="/product/:id" component={ProductDetails} /> 
                    <Route path="/account" exact  ><Account user={user} /></Route>*/}
                    <Route path="/" exact component={Home} />
                    <Route path="/account/:id/:pass"  component={Account} />
                    <Route path="/manager" component={Manager} />  
                    <Route path="/register" >  <Register updateHeader={updateHeader} /> </Route>
                    <Route path="/login" >  <Login updateHeader={updateHeader} /> </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
