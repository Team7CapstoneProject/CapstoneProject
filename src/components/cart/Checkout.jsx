import React, {useState} from 'react';
import { updateCartCompletion } from '../../api';

const Checkout = ({cart, userAccount}) => {
const [orderMessage, setOrderMessage] = useState("")

    const handleSubmit = async (event)=>{
        event.preventDefault();
        const token = localStorage.getItem('token')
        const cart_id = cart.id
        const placedOrder = await updateCartCompletion(token, cart_id)
        if(placedOrder){
            console.log("order placed!")
            setOrderMessage("Congrats! Your order has been placed")
            console.log(cart)
            //would be nice to somehow send an email confirmation
        }else{
            console.log('order failed :(')
            setOrderMessage("Error placing order")
        }

    }

    return(
        <>{ !userAccount ? 
        <div> 
            <div>Please create an account or logIn here</div>
        </div>
        : 
        <div>
        <div>Fill out shipping address here</div>
        <form onSubmit={handleSubmit}>
            <label>Street Address:</label>
            <input required></input>
            <label>Unit/apt #:</label>
            <input></input>
            <label>City:</label>
            <input required></input>
            <label>ZipCode:</label>
            <input required></input>
            <label>State:</label>
            <select>
                <option>AL</option>
                <option>AK</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CZ</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>DC</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>OR</option>
                <option>PA</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
            </select>
            <button>Submit</button>
        </form></div>}
        <div>{orderMessage}</div>
        </>
    )
}

export default Checkout;