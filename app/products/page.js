import Card from "../_components/card";
import Pagination from "../_components/pagination";
import DeleteButton from "../_components/deleteButton";
import { getProducts } from "../actions";

const Products = async (context) => {
  const page = context.searchParams.page ? context.searchParams.page : "1";

  const { products, totalPages } = await getProducts(page);
  console.log(products);

  const tableHeadings = [
    "Product Name",
    "Manufacturer",
    "Product Type",
    "Product Group",
    "Price (ILS)",
    "",
  ];

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <Card heading="Products" modal="product">
            <table className="m-4">
              <thead>
                <tr>
                  {tableHeadings.map((heading, index) => {
                    return <th key={index}>{heading}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product.productId.productName}</td>
                      <td>{product.productId.manufacturer}</td>
                      <td>{product.productId.productType}</td>
                      <td>{product.productId.productGroup}</td>
                      <td>{product.productId.price}</td>
                      <td>
                        <DeleteButton
                          id={product.productId._id.toString()}
                          modal="product"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Pagination
            type="products"
            totalPages={totalPages}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
