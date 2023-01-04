import { doc, getDoc } from "firebase/firestore";
import React, { use } from "react";
import { db } from "../../../firebase-config";
import Product from "../../../components/productPage/Product";

async function getData(id) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  const productInfo = docSnap.data();
  return productInfo;
}

function page({ params }) {
  const product = use(getData(params.id));
  return (
    <div className="">
      <Product product={product} />
    </div>
  );
}

export default page;
