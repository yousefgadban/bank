import React, { useState } from "react";

export const WithDrawal = ({display, onWithDrawalCash}) => {

    const [amount, setAmount] = useState(0);

    const onWithDrawalClicked = () => {
        console.log('onWithDrawalClicked', amount);

        if (amount > 0) {
            onWithDrawalCash(amount);
        } else {
            console.log('invalid amount');
        }
        
    }


    return (
        <div style={{display: display === 'withDrawal' ? 'block' : 'none'}}>
            <p>Amount: </p>
            <input className="inputNumber" type='number' value={amount} onChange={(e)=>{e.target.value > 0 ? setAmount(e.target.value) : setAmount(0)}} />
            <input className="account-btn" type='button' value='WithDrawal' onClick={(e) => {onWithDrawalClicked()}} />
        </div>
    );
}