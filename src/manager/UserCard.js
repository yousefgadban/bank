import React, {useEffect, useState} from "react";
import {  GetAllAction, TransferCash, DeleteUser } from '../api/api'

export const UserCard = ({user, onDeleteUser}) => {

    const [allActions, setAllActions] = useState([]);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [amountToTransfer, setAmountToTransfer] = useState(0);

    useEffect(()=> {

        GetAllAction(user.id).then((response)=>{
            let allActions = response.data;
            console.log(allActions);
            setAllActions(allActions);
            // calculateCurrentAmount();
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

    const onTransferClicked = () => {
        console.log('onTransferClicked ', amountToTransfer);

        if (+amountToTransfer > 0) {
            let params = {
                customerId: user.id,
                cash: +amountToTransfer,
                isWithDrawal: false,
                transaction: `Cash from manager`
            }
            
            TransferCash(params).then((response)=>{
                let actionResponse = response.data;
                console.log(actionResponse);
                if (response.status === 201) {
                    setCurrentAmount((prevAmount) => prevAmount + +amountToTransfer);
                } else {
                    console.log('somthing wrong, try again later');
                }
            });
        } else {
            console.log('cant transfer zero or less');
        }

        

    }

    const onDeleteUserClicked = () => {
        console.log('onDeleteUserClicked ', user.id);

        DeleteUser(user.id).then((response)=>{
            let actionResponse = response.data;
            console.log(actionResponse);
            if (response.status === 200) {
                onDeleteUser(user.id)
            } else {
                console.log('somthing wrong, try again later');
            }
        });
    }

    return (
        <div>
             <div style={{border: '1px solid #333', borderRadius: '12px', margin: '10px', width: '350px', padding: '10px', display: 'flex', alignItems: 'center'}}>
                
                <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                    <img className="account-profile-img" alt="" src={ user.avatar } style={{width: '100px'}} />
                    <input 
                        type='button' 
                        value='Delete'  
                        onClick={(e)=>{onDeleteUserClicked()}}
                        style={{backgroundColor: '#d14c47', border: '1px solid #d14c47', color: 'white', borderRadius: '5px', height: '30px', width: '100px'}} />
                </div>
                
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                    <p>Welcome: <span>{user.name }</span></p>
                    <p>Account Number: <span>{user.accountNumber}</span></p>
                    <p>Balance: <span>{currentAmount} &#8362;</span></p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input 
                            type='number' 
                            onChange={(e) => {setAmountToTransfer(e.target.value)}}
                            style={{height: '30px', width: '70px', backgroundClip: 'white', borderRadius: '4px', border: '1px solid #2196f3'}} />
                        <input 
                            type='button' 
                            value='Transfer' 
                            onClick={(e)=>{onTransferClicked()}}
                            style={{backgroundColor: '#2196f3', border: '1px solid #2196f3', color: 'white', borderRadius: '5px', height: '30px', width: '100px'}} />
                    </div>
                   
                </div>
            </div>
        </div>
    );
}