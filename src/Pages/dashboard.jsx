import { Fragment } from "react";
// import CardProduct from "../components/Fragments/CardProduct";
import SideMenu from "../components/Layouts/SideMenu";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Layouts/Navbar";
import CardList from "../components/Fragments/CardDashboard";

const ProductsPage = () => {
  useLogin();
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const storedCart = localStorage.getItem("cart");
  //   if (storedCart) {
  //     setCart(JSON.parse(storedCart));
  //   }
  // }, []);

  return (
    <Fragment>
      <div className="bg-neutral-100 overflow-hidden flex flex-row">
        <SideMenu />
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex justify-center py-10 px-11 flex-wrap">
            <CardList />
          </div>
        </div>
      </div>

      {/* <div
        className={`flex justify-center py-5 ${isDarkMode && "bg-slate-900"}`}
      >
        <div className="w-4/6 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header
                  image={product.image}
                  id={product.id}
                ></CardProduct.Header>
                <CardProduct.Body name={product.title}>
                  {product.description}
                </CardProduct.Body>
                <CardProduct.Footer
                  price={product.price}
                  id={product.id}
                ></CardProduct.Footer>
              </CardProduct>
            ))}
        </div>
      </div> */}
      {/* <div className="mt-5 flex justify-center mb-5">
        <Counter></Counter>
      </div> */}
    </Fragment>
  );
};

export default ProductsPage;
