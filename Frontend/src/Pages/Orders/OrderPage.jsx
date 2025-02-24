import React, { useEffect, useState } from "react";
import Card from "../../components/Orders/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  // const [order, setOrders] = useState();
  useEffect(() => {
    dispatch(getOrders());
    // console.log("orders: "+orders);
  }, []);

  return (
    <>
      <div className="mt-10 mb-20 mx-5">
        <h1 className="font-serif text-[2rem] font-semibold">Orders</h1>
        <div className="flex flex-col gap-10 mt-7">
          {orders.map((order) => (
            <div>
              <Card order={order} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
