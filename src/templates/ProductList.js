import React, { useEffect } from "react";
import { ProductCard } from "../components/Products";
import {useDispatch} from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {

  }, []);

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        <ProductCard></ProductCard>
      </div>
    </section>
  )
}

export default ProductList;