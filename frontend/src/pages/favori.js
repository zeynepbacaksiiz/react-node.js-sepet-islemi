import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";

function BasketComponent() {
  const [baskets, setBaskets] = useState([]);
  const [total, setTotal] = useState(null);
  const getAll = async() =>{
    let user = JSON.parse(localStorage.getItem("user"));
    let model = {userId: user._id};
    let response = await axios.post("http://localhost:3840/favori/getAll",model);
    setBaskets(response.data); 
     
    let totalC = 0;
    for (let i = 0; i < baskets.length; i++) {            
        totalC += baskets[i].products[0].price
    }
    setTotal(totalC);       
    console.log(response.data)
   
}
const addBasket = async (productId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { productId: productId, userId: user._id };
    var response = await axios.post("http://localhost:3840/baskets/add", model);
    console.log(response.data);
  

    getAll();
  };

  useEffect(() => {
    getAll();
  });

  return (
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Favorilerim</h1>
          </div>
          <div className="card-body">
          <h6 style={{float:"right"}}>Toplam favorilerim:{baskets.length} </h6>,
          <div className="row">
            {baskets.map((product, index) => (
      
  <div key={index} className="col-md-4 mt-2">
              
              <div className="card">
                <div className="card-body">
                  <h4>{product.products[0].name}</h4>
                  <img
                    style={{ width: "180px", height: "150px" }}
                    src={
                      "http://localhost:3840/" + product.products[0].imageUrl
                    }
                  />
                  <h4
                    className=" mt-1 text-left"
                    style={{ textAlign: "left" }}
                  >
                    Adet: {product.products[0].stock}
                  </h4>
                  <h4
                    className="text-danger mt-1 "
                    style={{ textAlign: "left" }}
                  >
                    Fiyat: {product.products[0].price}TL
                  </h4>

          
                </div>
              </div>
            </div>
           
            
            ))}     </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasketComponent;
