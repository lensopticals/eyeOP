import React from "react";
import Card from "../../components/Orders/card";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const eyeglassesOrders = [
    {
      orderId: "ORD001",
      name: "Classic Aviator",
      material: "Metal",
      price: 1500,
      quantity: 2,
      thumbnail: "/images/frames/cateye.jpg"
    },
    {
      orderId: "ORD002",
      name: "Retro Round",
      material: "Acetate",
      price: 1200,
      quantity: 1,
      thumbnail: "/images/frames/cateye.jpg"
    },
    {
      orderId: "ORD003",
      name: "Modern Rectangle",
      material: "Titanium",
      price: 1800,
      quantity: 3,
      thumbnail: "/images/frames/cateye.jpg"
    },
    {
      orderId: "ORD004",
      name: "Vintage Cat-Eye",
      material: "Plastic",
      price: 1300,
      quantity: 1,
      thumbnail: "/images/frames/cateye.jpg"
    },
    {
      orderId: "ORD005",
      name: "Sporty Wraparound",
      material: "Polycarbonate",
      price: 1600,
      quantity: 2,
      thumbnail: "/images/frames/cateye.jpg"
    },
  ];
  const navigate = useNavigate();
  const handleClick = async(orderId) => {
    navigate(`/orders/${orderId}`);
  }
  return (
    <>
      <div className="mt-10 mx-5">
        <h1 className="font-serif text-[2rem] font-semibold">Orders</h1>
        <div className="flex flex-col gap-10 mt-7">
          {eyeglassesOrders.map((order) => (
            <div onClick={() => {handleClick(order.orderId)}}>
              <Card data={order} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderPage;
