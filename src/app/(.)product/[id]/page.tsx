"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/interfaces";
import { useParams, useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import CustomImage from "@/components/image";
import ReactStars from "react-stars";
import { toast } from "react-toastify";
// import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
// import { StarIcon } from "@heroicons/react/24/solid";

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await res.json();
      console.log(product);
      setProduct(product);
      setLoading(false);
    }

    getData();
  }, [id]);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      const products: ProductType[] =
        JSON.parse(localStorage.getItem("carts") as string) || [];
      const isExistProduct = products.find((c) => c?.id === product?.id);

      if (isExistProduct) {
        const updateData = products.map((c) =>
          c.id === product?.id ? { ...c, quantity: c.quantity + 1 } : c
        );
        localStorage.setItem("carts", JSON.stringify(updateData));
      } else {
        const data = [...products, { ...product, quantity: 1 }];
        localStorage.setItem("carts", JSON.stringify(data));
      }
      toast("Product added to your bag");
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {loading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <CustomImage product={product} fill />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{product?.title}</h4>
                    <p className="font-medium text-sm">${product?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{product?.rating?.rate}</p>
                      {product?.rating?.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          <ReactStars
                            value={product.rating.rate}
                            edit={false}
                          />
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {product?.rating.count} rewiews
                      </p>
                    </div>
                    <p className="leading-relaxed text-base line-clamp-3">
                      {product?.description ||
                        "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche"}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                      onClick={handleClick}
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full bg-transparent border-blue-600 text-black hover:bg-blue-600 hover:text-white hover:border-transparent"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
