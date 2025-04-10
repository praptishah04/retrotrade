import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ViewProducts = () => {

    const [products, setproducts] = useState([])
    const getAllMyProducts = async() => {

        const res = await axios.get("/product/getProductsbyuserid/"+localStorage.getItem("id"))
        console.log(res.data) //api response...
        setproducts(res.data.data)

    }

    useEffect(() => {
        
        getAllMyProducts()
        
    }, [])
    

  return (
    <div style={{textAlign:"center"}}>
        MY Products
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>ProductsName</th>
                    <th>IMAGE</th>
                </tr>
            </thead>
            <tbody>
                {
                   products?.map((sc)=>{
                    return<tr key={sc._id}>
                        <td>{sc.name}</td>
                        <td>
                            <img  style ={{height:100,width:100}}src={sc?.imageURL} alt={sc.name}></img>
                        </td>
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}