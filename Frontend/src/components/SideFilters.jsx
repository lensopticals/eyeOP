import React from "react";
import "../styles/sideFilters.css";
const SideFilters = () => {
  return (
    <>
      <div className="sideBar w-[22rem] bg-slate-100 py-2">
        <div className="gender m-2 flex gap-6">
          <div className="male border border-black px-2 w-[4rem]">
            <img
              src="https://cdn.eyemyeye.com/shared/icons/Men.svg"
              alt="#"
              className="m-auto pt-1"
            />
            <p className="text-center">Male</p>
          </div>
          <div className="female border border-black px-2 w-[4rem]">
            <img
              src="https://cdn.eyemyeye.com/shared/icons/Women.svg"
              alt="#"
              className="m-auto pt-1"
            />
            <p className="text-center">Female</p>
          </div>
          <div className="kids border border-black px-2 w-[4rem]">
            <img
              src="https://cdn.eyemyeye.com/shared/icons/Kids.svg"
              alt="#"
              className="m-auto pt-1"
            />
            <p className="text-center">Kids</p>
          </div>
        </div>

        <div className="age m-2 mt-4">
          <h3 className="mb-2">Age Group</h3>
          <div className="group flex gap-2  ml-2">
            <input type="checkbox" name="age" id="c1" />
            <p>below 12 yr old.</p>
          </div>
          <div className="group flex gap-2 ml-2">
            <input type="checkbox" name="age" id="c2" />
            <p>12 - 20 yr old.</p>
          </div>
          <div className="group flex gap-2 ml-2">
            <input type="checkbox" name="age" id="c3" />
            <p>above 30 yr old.</p>
          </div>
        </div>

        <div className="framType m-2 mt-7">
          <h3>Frame Type</h3>
          <div className="types flex gap-3 mt-2 ml-3">
            <div className="t1 border border-gray border-gray-500 p-2">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/FullFrame.svg"
                alt="#"
              />
              <p className="text-xs mt-2">Full Frame</p>
            </div>
            <div className="t2 border border-gray border-gray-500 p-2">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/HalfFrame.svg"
                alt="#"
              />
              <p className="text-xs mt-2">Half Frame</p>
            </div>
            <div className="t3 border border-gray border-gray-500 p-2">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Rimless.svg"
                alt="#"
              />
              <p className="text-xs mt-2">Rim less</p>
            </div>
          </div>
        </div>

        <div className="frameType m-2 mt-7">
          <h3>Frame Shape</h3>
          <div className="types grid grid-cols-3 gap-2 mt-2 ml-3 pr-5">
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Aviator.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Aviotar</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Butterfly.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Butterfly</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Cateye.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Cateye</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Clubmaster.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Clubmaster</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Hexagon.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Hexagon</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Oval.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Oval</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Rectangle.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Rectangle</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Rectangle.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Round</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Square.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Square</p>
            </div>
            <div className="box">
              <img
                src="https://cdn.eyemyeye.com/shared/icons/Wayfarer.svg"
                alt="#"
                className="boxImage"
              />
              <p className="text">Wayfarer</p>
            </div>
          </div>
        </div>

        <div className="colors mt-7">
          <h1>FRAME COLORS</h1>
          <div>
            <input type="checkbox" name="color" id="color" />
            <span className="circle"></span>
            <p>Black</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <span className="circle bg-gray-500"></span>
            <p>Gray</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <span className="circle bg-blue-400"></span>
            <p>Blue</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <span className="circle bg-white"></span>
            <p>White</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <span className="circle bg-yellow-400"></span>
            <p>Yellow</p>
          </div>
        </div>

        <div className="material mt-7">
          <h1>MATERIAL</h1>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Acetate</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Metal</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Nylon</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Plastic</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Stainless Steel</p>
          </div>
        </div>

        <div className="collections mt-7">
          <h1>COLLECTIONS</h1>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Bamboo Eyegalsses</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Color Blind Glasses</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Color Changing Frames</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Computer Glasses</p>
          </div>
          <div>
            <input type="checkbox" name="color" id="color" />
            <p>Economy Eyeglasses</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideFilters;
