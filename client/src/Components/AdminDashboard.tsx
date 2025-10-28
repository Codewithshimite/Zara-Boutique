import { useEffect, useState } from "react";
import AdminStatus from './AdminStatus';
// import { API_BASE_URL } from "../config";


interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  category: string;
  imageUrl?: string; // URL returned from backend
}

interface NewProductForm {
  _id: string;
  name: string;
  price: string;
  description: string;
  rating: string;
  category: string;
  image: File | null;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    _id: "",
    name: "",
    price: "",
    description: "",
    rating: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewProduct((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation can be expanded as needed
    if (
      !newProduct.name.trim() ||
      !newProduct.price ||
      !newProduct.description.trim() ||
      !newProduct.rating ||
      !newProduct.category.trim() ||
      (!newProduct._id && !newProduct.image)
    ) {
      alert("Please fill in all required fields and select an image for new products.");
      return;
    }

    const method = newProduct._id ? "PUT" : "POST";
    const url = newProduct._id
      ? `${API_BASE_URL}products/${newProduct._id}`
      : `${API_BASE_URL}/products`;

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("rating", newProduct.rating);
      formData.append("category", newProduct.category);

      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        console.error("Failed to save product");
        alert("Failed to save product");
        return;
      }

      const updatedProduct: Product = await response.json();

      setProducts((prev) =>
        newProduct._id
          ? prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
          : [...prev, updatedProduct]
      );

      // Reset form
      setNewProduct({
        _id: "",
        name: "",
        price: "",
        description: "",
        rating: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. See console for details.");
    }
  };

  const handleEdit = (product: Product) => {
    setNewProduct({
      _id: product._id,
      name: product.name,
      price: String(product.price),
      description: product.description,
      rating: String(product.rating),
      category: product.category,
      image: null, // Reset image on edit to require new upload if needed
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete product");
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. See console for details.");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Admin Dashboard</h2>

      <AdminStatus />

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
          required
          style={{ padding: 8, width: 250 }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
          style={{ padding: 8, width: 250 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
          style={{ padding: 8, width: 250, height: 60 }}
        ></textarea>
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={newProduct.rating}
          onChange={handleChange}
          min="1"
          max="5"
          step="0.1"
          required
          style={{ padding: 8, width: 250 }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
          required
          style={{ padding: 8, width: 250 }}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          // Only require image field if creating new product, not editing
          required={!newProduct._id}
          style={{ padding: 8, width: 250 }}
        />
        <button
          type="submit"
          style={{
            padding: 10,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          {newProduct._id ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 15,
              width: 250,
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            
            <h3>{product.name}</h3>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold" }}>Price: ₦{product.price}</p>

            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ maxWidth: "100%", height: "auto", marginBottom: 12, borderRadius: 6 }}
              />
            )}

            <div style={{ color: "#FFD700", fontSize: 18, marginBottom: 10 }}>
              {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
                <span key={`full-${i}`}>★</span>
              ))}
              {product.rating % 1 >= 0.5 && <span key="half">⯨</span>}
              {Array.from({ length: 5 - Math.ceil(product.rating) }, (_, i) => (
                <span key={`empty-${i}`} style={{ color: "#ccc" }}>
                  ★
                </span>
              ))}
            </div>

            <button
              onClick={() => handleEdit(product)}
              style={{
                padding: 8,
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
                marginRight: 8,
              }}
              aria-label={`Edit ${product.name}`}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              style={{
                padding: 8,
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
              aria-label={`Delete ${product.name}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
