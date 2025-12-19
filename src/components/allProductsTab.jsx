import { useEffect, useState } from "react";
import { SearchBar } from "./ui/searchBar";

export const AllProductsTab = ({ products, onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products || []);
  }, [products]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products || []);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = products.filter((product) => {
      return (
        product.product_name?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower)
      );
    });

    console.log(`Found ${filtered.length} products for "${searchTerm}"`);
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div>
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search products by name, category ..."
      />

      <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Rating
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.product_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {product.product_name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {product.category || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      ${parseFloat(product.price || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {parseFloat(product.rating || 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onProductClick(product)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {searchTerm
                      ? `No products found for "${searchTerm}"`
                      : "No products available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Afficher le nombre de résultats */}
        {searchTerm && filteredProducts.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t text-sm text-gray-600">
            Found {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};
