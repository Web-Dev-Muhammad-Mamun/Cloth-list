/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./FormData.css";
import ClothTable from "../ClothTable/ClothTable";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import image from "../assets/download.png";
import { FaStarOfLife } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";

const getDataFromLocalstorage = () => {
  const getData = localStorage.getItem("clothDetails");
  return getData ? JSON.parse(getData) : [];
};

const FormData = () => {
  const [ischecked, setChecked] = useState(false);
  const [data, setData] = useState(getDataFromLocalstorage());

  //handle form
  const handleForm = (e) => {
    e.preventDefault();

    for (let key of data) {
      if (key.productId === e.target.productId.value)
        return alert("Id is already exist");
    }

    const inputvalues = {};
    const elements = [...e.target.elements];
    elements.forEach((item) => {
      if (item.type === "radio" && !item.checked) {
        return;
      }
      inputvalues[item.name] = item.value;
      item.value = "";
      item.checked = false;
    });
    setData([...data, inputvalues]);
    setChecked(false);
  };
  //handle the checkbox
  const handleCheckBox = (e) => {
    setChecked(e.target.checked);
  };
  const deleteItem = (productOfId) => {
    const filteredData = data.filter((item) => item.productId !== productOfId);
    setData(filteredData);
  };
  useEffect(() => {
    localStorage.setItem("clothDetails", JSON.stringify(data));
  }, [data]);
  return (
    <>
      <div className='container'>
        <div className='heading-section'>
          <h1>Cloth Price List</h1>
        </div>
        <form onSubmit={handleForm} className='form-container'>
          <fieldset>
            <legend>Cloths</legend>
            <div>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                Name (only user name) : <br></br>
                <input
                  type='text'
                  name='username'
                  placeholder="Don't input numbers or symbol"
                  autoFocus
                  minLength={3}
                  maxLength={10}
                  pattern='^[a-zA-Z]+$'
                  title='Only letters are allowed'
                  autoComplete='off'
                  required
                />
              </label>

              <br></br>

              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                ID (1-9999): <br></br>
                <input
                  name='productId'
                  placeholder='ID must be number'
                  type='number'
                  min={1}
                  max={9999}
                  required
                  autoComplete='off'
                  step={1}
                />
              </label>

              <br></br>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                Cloth Name : <br></br>
                <input
                  type='text'
                  name='productName'
                  placeholder='Type product name'
                  maxLength={10}
                  pattern='^[a-zA-Z]+$'
                  required
                  autoComplete='off'
                />
              </label>
              <br></br>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>price (100 - 9999): <br></br>
                <input
                  required
                  type='number'
                  name='productPrice'
                  placeholder='Minimum buy upto 100(TK)'
                  autoComplete='off'
                  min={100}
                  max={9999}
                />
              </label>
              <br></br>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                Quanity (1-999): <br></br>
                <input
                  required
                  type='number'
                  name='quantity'
                  placeholder='Minimum select two quantity'
                  autoComplete='off'
                  min={1}
                  max={999}
                />
              </label>
              <br></br>
              <label>
                Description : <br></br>
                <textarea
                  style={{ resize: "none" }}
                  name='description'
                  id=''
                  cols='30'
                  rows='5'
                  placeholder='type your description'
                  maxLength={50}
                  autoComplete='off'></textarea>
              </label>
              <br></br>
            </div>
            <div>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                {"Select color :"}
                <br></br>
                <select required name='color'>
                  <option  value=''>Select color</option>
                  <option value='red'>Red</option>
                  <option value='Green'>Green</option>
                  <option value='blue'>Blue</option>
                </select>
              </label>
              <br></br>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                {"Manufacture Date : "} <br></br>
                <input
                  required
                  type='date'
                  name='date'
                  min='2020-01-02'
                  id=''
                />
              </label>
              <br></br>
              <label>
                <i>
                  <FaStarOfLife size={8} color='red' />{" "}
                </i>
                Select size : <br></br>
                <input id='sSize' value='S' required type='radio' name='size' />
                <label htmlFor='sSize'>S</label>
                <input id='mSize' value='M' required type='radio' name='size' />
                <label htmlFor='mSize'>M</label>
                <input id='lSize' value='L' required type='radio' name='size' />
                <label htmlFor='lSize'>L</label>
                <input
                  value='XL'
                  id='xlSize'
                  required
                  type='radio'
                  name='size'
                />
                <label htmlFor='xlSize'>XL</label>
              </label>
              <br></br>
              <label>
                {" "}
                <br></br>
                <input onChange={handleCheckBox} name='terms' type='checkbox' />
                {""}I agree to these <a href='#'>Terms and Conditions</a>.
              </label>
              <br></br>
            </div>
          </fieldset>
          <button disabled={!ischecked} type='submit' className='add-cart-btn'>
            Add to cart
          </button>
        </form>
        {/* table */}
        <div className='table'>
          {data.length == 0 ? (
            <>
              <h2>
                <i>
                  <MdOutlineProductionQuantityLimits />{" "}
                </i>{" "}
                You have not any product yet
              </h2>
              <img width={"300px"} src={image} alt='' />
            </>
          ) : (
            <div style={{overflowX:"scroll"}}>
              <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Cloth Name</th>
                  <th>Cloth Price</th>
                  <th>Quantity</th>
                  <th>color</th>
                  <th>Manufacture Date</th>
                  <th>Size</th>
                  <th>Description</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {data.map((item, index) => (
                <ClothTable key={index} deleteItem={deleteItem} item={item} />
              ))}
              <button className='delete-all-btn' onClick={() => setData([])}>
                {" "}
                <i style={{ position: "relative", top: "5px" }}>
                  <CiSquareRemove size={25} color='black' width={30} />
                </i>{" "}
                Remove All
              </button>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FormData;
