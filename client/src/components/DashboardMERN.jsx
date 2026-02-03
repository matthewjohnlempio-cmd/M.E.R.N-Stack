import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";
import Pagination from "./Pagination";
import Footer from "./Footer";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [form, setForm] = useState({
    name: "",
    price: "",
    sku: "",
    category: "",
    stock: "",
    description: "",
  });

  // Axios instance
  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" },
  });

  // Fetch products from server
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.map((p) => ({ ...p, id: p._id })));
    } catch (err) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      sku: "",
      category: "",
      stock: "",
      description: "",
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.sku) {
      alert("Name, price, and product number are required");
      return;
    }

    try {
      if (editingId) {
        const res = await api.put(`/products/${editingId}`, form);
        setProducts(
          products.map((p) =>
            p.id === editingId ? { ...res.data, id: res.data._id } : p
          )
        );
      } else {
        const res = await api.post("/products", form);
        setProducts([{ ...res.data, id: res.data._id }, ...products]);
      }
      resetForm();
    } catch (err) {
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);

      if (currentPage > Math.ceil(updated.length / rowsPerPage)) {
        setCurrentPage((p) => Math.max(p - 1, 1));
      }
    } catch {
      alert("Failed to delete product");
    }
  };

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login/mern");
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white animate-fade-in font-sans flex flex-col">
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-teal-400">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {currentUser?.name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-[#2a2a2a] rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-teal-300">Products</h2>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 transition font-medium"
            >
              + Add Product
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : paginatedProducts.length === 0 ? (
            <p className="text-slate-400">No products available.</p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-[#3a3a3a]">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-[#3a3a3a]">
                      <th className="py-3 px-4">Name</th>
                      <th className="px-4">SKU</th>
                      <th className="px-4">Category</th>
                      <th className="px-4">Price</th>
                      <th className="px-4">Stock</th>
                      <th className="text-right px-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedProducts.map((product, i) => (
                      <tr
                        key={product.id}
                        className="border-b border-[#3a3a3a] hover:bg-[#333333] transition"
                        style={{
                          animation: `rowFade 0.3s ease ${i * 0.05}s both`,
                        }}
                      >
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="px-4">{product.sku}</td>
                        <td className="px-4">{product.category}</td>
                        <td className="px-4 text-teal-400">₱{product.price}</td>
                        <td className="px-4">{product.stock}</td>
                        <td className="text-right space-x-2 px-4">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 rounded-lg bg-red-700 hover:bg-red-600 transition text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </>
          )}
        </div>
      </div>
      <Footer />

      {/* Modal */}
      <ProductModal
        open={showModal}
        onClose={resetForm}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        isEditing={!!editingId}
      />
      
      {/* Styles */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.4s ease-out;
          }
          @keyframes rowFade {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .input {
            background: #1b1b1b;
            border: 1px solid #3a3a3a;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            color: #ffffff;
          }
          .input:focus {
            outline: none;
            border-color: #14b8a6;
          }
        `}
      </style>
      
    </div>
  );
}
