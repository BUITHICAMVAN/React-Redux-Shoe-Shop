import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiActionProductDetailAsync } from "../../redux/reducers/productReducer";
import { NavLink, useParams } from "react-router-dom";
import { addToCart } from "../../redux/reducers/productCart";

const Details = () => {
  const { productDetail } = useSelector((state) => state.productReducer);
  // const { arrProductCart } = useSelector((state) => state.productCartReducer);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const getApiProductDetail = async () => {
      const action = getApiActionProductDetailAsync(params.id);
      await dispatch(action);
      setLoading(false);
    };

    if (!productDetail || productDetail.id !== params.id) {
      setLoading(true);
      getApiProductDetail();
    }
  }, [params.id, productDetail]);
  const handleAddToCart = () => {
    let newProductDetail = {};
    newProductDetail = { ...productDetail };
    newProductDetail.quantity = quantity;
    const action = addToCart(newProductDetail);
    dispatch(action);
  };
  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {productDetail && (
        <div className="row">
          <div className="col-5">
            <img src={productDetail.image} alt={productDetail.name} />
          </div>
          <div className="col-7 detail__custom">
            <h4>{productDetail.name}</h4>
            <p>{productDetail.description}</p>

            <h3>{productDetail.price} $</h3>
            <div>
              <button
                onClick={() => {
                  const value = Math.max(quantity - 1, 1);
                  setQuantity(value);
                }}
              >
                -
              </button>
              <input
                className="m-1"
                style={{ width: 70, textAlign: "center" }}
                value={quantity}
                onInput={(event) => {
                  let value = event.target.value;
                  value = Math.min(parseInt(value), 300);
                  setQuantity(value);
                }}
                onKeyPress={(event) => {
                  const charCode = event.key;
                  if (
                    isNaN(parseInt(charCode)) &&
                    charCode !== "e" &&
                    charCode !== "." &&
                    charCode !== "-" // Chặn việc nhập dấu âm
                  ) {
                    event.preventDefault();
                  }
                }}
              />
              <button
                onClick={() => {
                  const value = Math.max(quantity + 1, 1);
                  setQuantity(value);
                }}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-dark"
              onClick={() => {
                handleAddToCart();
              }}
            >
              <i className="fa fa-cart-plus"></i> Add to cart
            </button>
          </div>
          <div className="row mt-2">
            <h3>Related Products</h3>
            {productDetail.relatedProducts?.map((prod) => (
              <div className="col-4" key={prod.id}>
                <div className="card">
                  <img src={prod.image} alt={prod.name} />
                  <div className="card-body">
                    <h3>{prod.name}</h3>
                    <p>{prod.price} $</p>
                    <NavLink
                      to={`/detail/${prod.id}`}
                      className="btn btn-primary"
                    >
                      Detail
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
