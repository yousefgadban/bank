import React, {useState, useEffect} from "react";
import { useParams  } from 'react-router-dom';
import { GetUserData, GetAllAction, AddWithDrawal, GetAllUsers, TransferCash } from '../api/api'
import './account.css'
import { AllActions } from "./actions/AllActions";

import { Transfer } from "./actions/Transfer";
import { WithDrawal } from "./actions/WithDrawal";


export const Account = (props) => {

    const { id, pass } = useParams();
    const [user, setUser] = useState(null);
    const [allActions, setAllActions] = useState([]);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [display, setDisplay] = useState('none');

    useEffect(()=>{

        console.log('two params ', id, pass);
        // get user data from db
        GetUserData(id).then((response)=>{
            let currentUser = response.data;
            console.log(currentUser);
            setUser(currentUser);

            GetAllAction(id).then((response)=>{
                let allActions = response.data;
                console.log(allActions);
                setAllActions(allActions);
                // calculateCurrentAmount();
            });
        });
        
    }, []);


    const calculateCurrentAmount = () => {
        let amount = allActions.reduce((prev, action) => {
            return  prev + (action.isWithDrawal ? -action.cash : action.cash);
        }, 0)
        setCurrentAmount(amount);
    }

    useEffect(()=>{
        console.log('allActions', allActions);
        calculateCurrentAmount();
    }, [allActions]);

    const onAllActionsClicked = () => {
        console.log('onAllActionsClicked');
        setDisplay('allActions');
    }

    const onWithDrawalClicked = () => {
        console.log('onWithDrawalClicked');
        setDisplay('withDrawal');
    }

    const onTransferClicked = () => {
        console.log('onTransferClicked');
        setDisplay('transfer');
    }

    const onWithDrawalCash = (amount) => {
        console.log('onWithDrawalCash', amount);

        if (currentAmount - amount >= -5000) {
            console.log('do withdrawal');

            let params = {
                customerId: id,
                cash: amount,
                isWithDrawal: true,
                transaction: 'A.T.M'

            }
            
            AddWithDrawal(params).then((response)=>{
                let actionResponse = response.data;
                console.log(actionResponse);
                if (response.status === 201) {
                    setCurrentAmount((prevAmount) => prevAmount - amount);
                } else {
                    console.log('somthing wrong, try again later');
                }
            });

        } else {
            console.log('invalid amount to withdrawal');
        }
    }

    const onTransferCash = (Amount, ToAccount) => {
        let amount = +Amount;
        let toAccount = +ToAccount;
        console.log('onTransferCash', typeof amount, typeof toAccount);

        GetAllUsers().then((response)=>{
            let allUsers = response.data;
            console.log(allUsers);
            
            let transferToUser = allUsers.find((user) => {
                return user.accountNumber === toAccount
            })
            
            if (transferToUser === undefined) {
                console.log('No such account');
            } else {
 
                console.log('transfer ', transferToUser.id);
                
                let params = {
                    customerId: id,
                    cash: amount,
                    isWithDrawal: true,
                    transaction: `Transfer to account ${toAccount}`
                }
                
                TransferCash(params).then((response)=>{
                    let actionResponse = response.data;
                    console.log(actionResponse);
                    if (response.status === 201) {
                        setCurrentAmount((prevAmount) => prevAmount - amount);

                        let params = {
                            customerId: transferToUser.id,
                            cash: amount,
                            isWithDrawal: false,
                            transaction: `Get from account ${toAccount}`
                        }

                        TransferCash(params).then((response)=>{
                            let actionResponse = response.data;
                            console.log(actionResponse);
                        });

                    } else {
                        console.log('somthing wrong, try again later');
                    }
                });
            }
        });
    }

    return(
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {console.log('display', display)}
            <div className="account-profile">
                <img className="account-profile-img" alt="" src={user ? user.avatar : 'https://cdn.fakercloud.com/avatars/thiagovernetti_128.jpg'} />
                <div>
                    <p>Welcome: <span>{user ? user.name : ''}</span></p>
                    <p>Account Number: <span>{user ? user.accountNumber : ''}</span></p>
                    <p>Current amount: <span>{currentAmount} &#8362;</span></p>
                </div>
            </div>

            <br />
            <div>
                <input className="account-btn" type="button" value="All Actions" onClick={(e) => {onAllActionsClicked()}} />
                <input className="account-btn" type="button" value="WithDrawal" onClick={(e) => {onWithDrawalClicked()}} />
                <input className="account-btn" type="button" value="Transfer" onClick={(e) => {onTransferClicked()}} />
            </div>
            <br />
            <div className="account-transfer" >
                
                <WithDrawal display={display}  onWithDrawalCash={onWithDrawalCash} />
                <Transfer display={display} onTransferCash={onTransferCash} />
                
                <div style={{display: display === 'allActions' ? 'block' : 'none'}}>

                <AllActions display={display}  allActions={allActions} />
                </div>
            </div>
        </div>
    );
}