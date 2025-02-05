import React, { useEffect, useState } from "react";
import Card from "../../components/Orders/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/orderActions";

const OrderPage = () => {
  const eyeglassesOrders = [
    {
      orderId: "ORD001",
      name: "Classic Aviator",
      material: "Metal",
      price: 1500,
      quantity: 2,
      thumbnail: "/images/frames/cateye.jpg",
    },
    {
      orderId: "ORD002",
      name: "Retro Round",
      material: "Acetate",
      price: 1200,
      quantity: 1,
      thumbnail: "/images/frames/cateye.jpg",
    },
    {
      orderId: "ORD003",
      name: "Modern Rectangle",
      material: "Titanium",
      price: 1800,
      quantity: 3,
      thumbnail: "/images/frames/cateye.jpg",
    },
    {
      orderId: "ORD004",
      name: "Vintage Cat-Eye",
      material: "Plastic",
      price: 1300,
      quantity: 1,
      thumbnail: "/images/frames/cateye.jpg",
    },
    {
      orderId: "ORD005",
      name: "Sporty Wraparound",
      material: "Polycarbonate",
      price: 1600,
      quantity: 2,
      thumbnail: "/images/frames/cateye.jpg",
    },
  ];
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order)
  // const [order, setOrders] = useState();
  useEffect(() => {
    dispatch(getOrders());
    console.log(orders);
  }, []);
  const navigate = useNavigate();
  const handleClick = async (orderId) => {
    navigate(`/orders/${orderId}`);
  };
  return (
    <>
      <div className="mt-10 mx-5">
        <h1 className="font-serif text-[2rem] font-semibold">Orders</h1>
        <div className="flex flex-col gap-10 mt-7">
          {orders.map((order) => (
            <div
              onClick={() => {
                handleClick(order._id);
              }}
            >
              <Card data={order.orderItems[0].product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
