import React from 'react';
import './CartCard.css'

const CartCard = ({shirt, index}) => {
return (
        <div className='cart_card'>
                <div className='Tshirt_image '>
                        <img src={shirt.image}/>
                </div>
                <div>
                        
                        <ul>
                                <span className="shirt_size">{shirt.size.map((size)=>(
                                <li key={size}>{size}</li>      
                                ))}</span>
                        </ul>
                </div>
        </div>
       ); 
};

export default CartCard;
