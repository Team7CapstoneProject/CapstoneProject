import React from 'react';
import { useParams } from 'react-router-dom';

const ViewOfProducts = ({allProducts}) => {
let { productId } = useParams();
console.log(productId)
console.log(allProducts)
    return(
        <div>
{allProducts.map((product)=>{
    if(productId == product.id){
         return <div>
        <div>{product.name}</div>
        <img 
        className="productImg"
        src={product.img_url}
        />
        <div>{product.price}</div>
        <div></div>
       </div>
    }
   
})}
        </div>
    )
}

export default ViewOfProducts;