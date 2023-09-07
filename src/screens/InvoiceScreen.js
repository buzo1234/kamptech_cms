import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByInvoice } from "../actions";

const InvoiceScreen = () => {
  const { invoiceId } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const getCurrentOrder = async () => {
      const order = await getOrderByInvoice(invoiceId);
      if (order) setOrder(order);
      console.log(order);
    };
    getCurrentOrder();
  }, []);
  return (
    <>
      <div>Invoice Screen</div>
    </>
  );
};

export default InvoiceScreen;
