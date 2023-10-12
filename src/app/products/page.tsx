import { ProductType } from "@/interfaces";
import Feature from "../../components/feauture";
import Product from "@/components/product";
import Cta from "@/components/cta";

const ProductsPage = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: ProductType[] = await res.json();
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0">
      <Feature />
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
      <Cta />
    </main>
  );
};

export default ProductsPage;
