/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import './ClothTable.css'
import { AiOutlineDelete } from "react-icons/ai";
const ClothTable = ({ item, deleteItem }) => {
  const {
    username,
    productId,
    productName,
    productPrice,
    quantity,
    description,
    color,
    date,
    size,
  } = item;
  return (
     <tr>
      <td>{username}</td>
      <td>{productId}</td>
      <td>{productName}</td>
      <td>{productPrice}</td>
      <td>{quantity}</td>
      <td>{color}</td>
      <td>{date}</td>
      <td>{size}</td>
      <td>{description}</td>
      <td onClick={() => deleteItem(productId)} ><i><AiOutlineDelete /></i></td>
    </tr>
  );
};

export default ClothTable;
