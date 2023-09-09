import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByInvoice } from "../actions";
import { Provider, useSelector } from "react-redux";
import { getCurrency } from "../app/currencySlice";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import PrintIcon from "@mui/icons-material/Print";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  logoHeading: {
    flexDirection: "row", // Display children in a row
    alignItems: "center", // Vertically align children
    marginBottom: 20,
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    marginRight: 10, // Add some spacing between the image and text
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  leftColumn: {
    width: "45%",
  },
  rightColumn: {
    width: "45%",
  },
  details: {
    marginTop: 10,
  },
  totalAmount: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

const InvoicePdf = ({
  invoiceId,
  order,
  currency,
  formattedTime,
  orderedProducts,
}) => {
  const conversionRate = 3.67;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoHeading}>
          <Image
            src="/logo.png" // Replace with your image file path
            style={styles.image}
          />
          <Text style={styles.logoText}>TechSouqDubai</Text>
        </View>
        <Text style={styles.heading}>Order Details</Text>

        <Text style={{ marginBottom: 10 }}>Date: {formattedTime}</Text>
        <Text style={{ marginBottom: 10 }}>Address: {order.address}</Text>

        <View style={{ width: "100vw" }}>
          <Text style={{ marginBottom: 10 }}>Invoice Number: {invoiceId}</Text>
          <Text style={{ marginBottom: 10 }}>Invoice To: {order.email}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text>
            Telephone: {order.telephone > 0 ? order.telephone : "N/A"}
          </Text>
          <Text style={{ marginBottom: 20 }}>Customer: {order.customer}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Sr. no</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Unit Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Net Price</Text>
            </View>
          </View>
          {orderedProducts.map((order, idx) => {
            const netTotal = order.product.salePrice * order.quantity;
            return (
              <View style={styles.tableRow} key={idx}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{idx + 1}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{order.product.title}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{order.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {`${
                      currency === "usd"
                        ? "$" +
                          (order.product.salePrice / conversionRate).toFixed(2)
                        : "AED " + order.product.salePrice
                    }`}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {`${
                      currency === "usd"
                        ? "$" + (netTotal / conversionRate).toFixed(2)
                        : "AED " + netTotal
                    }`}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.totalAmount}>
          Total Order Amount:{" "}
          {`${
            currency === "usd"
              ? "$" + (order.amount / conversionRate).toFixed(2)
              : "AED " + order.amount
          }`}
        </Text>
      </Page>
    </Document>
  );
};

const InvoiceScreen = () => {
  const { invoiceId } = useParams();
  const [order, setOrder] = useState(null);
  const currency = useSelector(getCurrency);
  const conversionRate = 3.67;
  const [formattedTime, setFormattedTime] = useState("");
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const getCurrentOrder = async () => {
      const invoiceOrder = await getOrderByInvoice(invoiceId);
      if (invoiceOrder) {
        setOrder(invoiceOrder);
        const orderedItems = [];
        for (let o of invoiceOrder.products) {
          orderedItems.push(JSON.parse(o));
        }
        setOrderedProducts(orderedItems);
        console.log(invoiceOrder);

        const dateTime = new Date(invoiceOrder.orderTime);
        const day = dateTime.getDate().toString().padStart(2, "0");
        const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
        const year = dateTime.getFullYear().toString();

        // Extract time components
        const hours = dateTime.getUTCHours().toString().padStart(2, "0");
        const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");

        // Formatted date and time strings
        const formattedTime = `${day}/${month}/${year} - ${hours}:${minutes}`;
        setFormattedTime(formattedTime);
      }
    };
    getCurrentOrder();
  }, [invoiceId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="font-bold text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-primary px-8 py-6 rounded-lg">
        <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
          <h1 className="font-bold  text-xl8 uppercase">
            Invoice
            <p className="text-xs mt-1 text-gray-500">
              Status
              <span className="pl-2 font-medium text-xs capitalize">
                {" "}
                <span className="">
                  <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                    {order.Status}
                  </span>
                </span>
              </span>
            </p>
          </h1>
          <div className="lg:text-right text-left">
            <h2 className="lg:flex lg:justify-end text-lg  font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
              Address:
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {order.address}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
              DATE
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 block">
              <span>{formattedTime}</span>
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
              INVOICE NO
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 block">
              {invoiceId}
            </span>
          </div>
          <div className="flex flex-col lg:text-right text-left">
            <span className="font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
              INVOICE TO
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 block">
              {order.customer} <br />
              {order.email}
            </span>
          </div>
        </div>

        <div>
          <div className="w-full overflow-hidden border border-gray-200 dark:border-secondary rounded-lg ring-1 ring-black ring-opacity-5 my-8">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-400 dark:bg-secondary">
                  <tr>
                    <td className="px-4 py-3">SR.</td>
                    <td className="px-4 py-3">Product Title</td>
                    <td className="px-4 py-3 text-center">QUANTITY</td>
                    <td className="px-4 py-3 text-center">ITEM PRICE</td>
                    <td className="px-4 py-3 text-right">AMOUNT</td>
                  </tr>
                </thead>
                <tbody className="divide-gray-700 bg-secondary text-gray-400 dark:text-gray-400 divide-y text-sm">
                  {orderedProducts.map((oP, idx) => (
                    <tr key={idx} className="border-secondary text-gray-400">
                      <td className="px-4 py-3 whitespace-nowrap font-normal text-gray-400 text-left">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-normal text-gray-400">
                        {oP.product.title}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-center">
                        {oP.quantity}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-bold text-center">
                        {currency === "usd"
                          ? "$" +
                            (oP.product.salePrice / conversionRate).toFixed(2)
                          : "AED " + oP.product.salePrice}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-bold text-red-500 dark:text-green-500">
                        {currency === "usd"
                          ? "$" +
                            (
                              (oP.product.salePrice * oP.quantity) /
                              conversionRate
                            ).toFixed(2)
                          : "AED " + oP.product.salePrice * oP.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-xl my-4 px-4 py-6 bg-secondary border-primary border-solid border-[1px]">
          <div className="flex lg:flex-row md:flex-row flex-col justify-between">
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
                PAYMENT METHOD
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold block">
                Cash
              </span>
            </div>
            <div className="flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
                TOTAL AMOUNT
              </span>
              <span className="text-xl font-bold text-red-500 dark:text-green-500 block">
                {currency === "usd"
                  ? "$" + (order.amount / conversionRate).toFixed(2)
                  : "AED " + order.amount}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-3 flex justify-end">
          <PDFDownloadLink
            document={
              <InvoicePdf
                invoiceId={invoiceId}
                order={order}
                currency={currency}
                formattedTime={formattedTime}
                orderedProducts={orderedProducts}
              />
            }
            fileName={`${invoiceId}-${order.customer}`}
          >
            <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto">
              Download Invoice
              <span className="ml-2">
                <PrintIcon />
              </span>
            </button>
          </PDFDownloadLink>
        </div>
      </div>
    </>
  );
};

export default InvoiceScreen;
