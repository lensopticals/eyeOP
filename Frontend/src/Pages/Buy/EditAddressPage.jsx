import React, { useEffect, useState } from "react";
import {
  getAddressById,
  updateAddress,
} from "../../redux/actions/addressAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productAction";
import Form from "../../components/Buy/Form";

const EditAddressPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const address1 = useSelector((state) => state.address);
  const navigate = useNavigate();

  // submit
  const operation = async (formData) => {
    try {
      const res = await dispatch(updateAddress({id: id, formData}));
      if (res.payload.success) {
        const pId = localStorage.getItem('pId');
        navigate(`/checkout/address/${pId}`);
      }
      localStorage.removeItem('pId');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form btn="Save Changes" operation={operation} />
    </>
  );
};

export default EditAddressPage;
