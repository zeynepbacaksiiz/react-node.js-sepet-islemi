import { useEffect, useState } from "react";
import axios from "axios";

function HomeComponent() {
  const [products, setProducts] = useState([]);

  const getAll = async () => {
    var response = await axios.get("http://localhost:3840/products");
    setProducts(response.data);
    console.log(products);
  };

  useEffect(() => {
    getAll();
  }, []);

  const addBasket = async (productId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { productId: productId, userId: user._id };
    var response = await axios.post("http://localhost:3840/baskets/add", model);
    console.log(response.data);
  

    getAll();
  };
  const add = async (productId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    let model = { productId: productId, userId: user._id };
    var response = await axios.post("http://localhost:3840/favori/add", model);
    console.log(response.data);
  

    getAll();
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mt-2">
              <div className="card">
                <div className="card-header">
                  <h4 style={{ textAlign: "center" }}>{product.name}</h4>
                </div>
                <div className="card-body">
                  <img
                    style={{
                      width: "180px",
                      height: "150px",
                      margin: "auto",
                      display: "block",
                    }}
                    src={"http://localhost:3840/" + product.imageUrl}
                  />
                  <h4 className="text-left mt-1">Adet: {product.stock}</h4>
                  <h4 className="text-left text-danger mt-1">
                    Fiyat: {product.price} TL
                  </h4>

                  <div className="row">
                    <div className="col-md-8  p-0">
                      {" "}
                      {product.stock > 0 ? (
                        <button
                          className="btn btn-success  w-100"
                          onClick={() => addBasket(product._id)}
                        >
                          Sepete Ekle
                        </button>
                      ) : (
                        <button className="btn btn-danger w-100 ">
                          Ürün Stokta Yok!
                        </button>
                      )}
                    </div>
                    <div className="col-md-4">
                      <button
                        className="btn  w-100"
                        onClick={() =>add(product._id)}
                      >
                        <i
                          className="fa-solid fa-heart "
                          style={{ color: "red", fontSize: "1.2rem" }}   
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
