import React, { useState } from "react";
import '../../App.css'

export const Transfer = ({display, onTransferCash}) => {

    const [amount, setAmount] = useState(0);
    const [toAccount, setToAccount] = useState(0);

    const onTransferClicked = () => {
        console.log('onTransferClicked', amount, toAccount);
        onTransferCash(amount, toAccount);
    } 

    return (
        <div style={{display: display === 'transfer' ? 'block' : 'none'}}>
            <p>Amount: </p>
            <input className="inputNumber" type='number' value={amount} onChange={(e)=>{e.target.value > 0 ? setAmount(e.target.value) : setAmount(0)}} />
            <p>To Account: </p>
            <input className="inputNumber" type='number' value={toAccount} onChange={(e)=>{e.target.value > 0 ? setToAccount(e.target.value) : setToAccount(0)}} />
            <input className="account-btn" type='button' value='Transfer' onClick={(e) => {onTransferClicked()}} />
        </div>
    );
}