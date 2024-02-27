import React from "react";

const SideFilters = () => {
  return (
    <>
      <div className="sideBar w-[25vw] h-[100vh] bg-slate-200 P-2">
        <div className="age m-2">
          <h3 className="mb-2">Age Group</h3>
          <div className="group1 flex gap-2  ml-2">
            <input type="checkbox" name="age" id="c1" />
            <p>below 12 yr old.</p>
          </div>
          <div className="group2 flex gap-2 ml-2">
            <input type="checkbox" name="age" id="c2" />
            <p>12 - 20 yr old.</p>
          </div>
          <div className="group3 flex gap-2 ml-2">
            <input type="checkbox" name="age" id="c3" />
            <p>above 30 yr old.</p>
          </div>
        </div>

        <div className="framType m-2 mt-7">
          <h3>Frame Type</h3>
          <div className="types flex gap-3 mt-2 ml-3">
            <div className="t1 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png"
                alt="#"
              />
              <p className="text-sm">Full Rim</p>
            </div>
            <div className="t2 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png"
                alt="#"
              />
              <p className="text-sm">Full Rim</p>
            </div>
            <div className="t3 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png"
                alt="#"
              />
              <p className="text-sm">Full Rim</p>
            </div>
          </div>
        </div>

        <div className="framType m-2 mt-7">
          <h3>Frame Shape</h3>
          <div className="types grid grid-cols-3 gap-2 mt-2 ml-3">
            <div className="t1 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t2 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t3 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t1 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t2 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t3 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t1 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t2 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
            <div className="t3 border border-gray border-gray-500 p-2">
              <img
                src="https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png"
                alt="#"
              />
              <p className="text-sm">Rectangle</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideFilters;
