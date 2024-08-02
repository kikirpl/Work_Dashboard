import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../services/product.service";

const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getDetailProduct(id, (data) => {
      setProduct(data);
    });
  }, [id]);
  console.log(product);

  return (
    <div className="w-100 min-h-screen flex justify-center items-center">
      {Object.keys(product).length > 0 && (
        <div className="flex p-6 font-mono">
          <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
            <img
              src={product.image}
              alt={product.title}
              className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <form className="flex-auto pl-6">
            <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                {product.title}
              </h1>
              <div className="relative text-lg text-white">
                ${product.price}
              </div>
              <div className="relative uppercase text-teal-400 ml-3">
                review {product.rating.rate}/5 ({product.rating.count})
              </div>
            </div>
            <div className="space-x-3 flex text-sm font-medium">
              {product.description}
            </div>
            <div className="flex space-x-2 mb-4 text-sm font-medium">
              <div className="flex space-x-4">
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                  type="submit"
                >
                  Buy now
                </button>
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                  type="button"
                >
                  Add to bag
                </button>
              </div>
              <button
                className="flex-none flex items-center justify-center w-12 h-12 text-black"
                type="button"
                aria-label="Like"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs leading-6 text-slate-500">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};
export default DetailProductPage;
