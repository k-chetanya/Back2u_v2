import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById, updateItem } from "../api/item.api";
import { toast } from "sonner";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

useEffect(() => {
  const fetchItem = async () => {
    try {
      const res = await getItemById(id);
      const item = res.data.item;

      setForm({
        title: item.title,
        description: item.description,
        category: item.category,
        location: item.location,
      });
    } catch (error) {
      toast.error("Failed to load item");
    }
  };

  fetchItem();
}, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await updateItem(id, form);
    toast.success("Item updated");
    navigate(`/item/${id}`);
  } catch (error) {
    toast.error("Update failed");
  }
};



  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Item</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          placeholder="Title"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="4"
          placeholder="Description"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="electronics">Electronics</option>
          <option value="documents">Documents</option>
          <option value="accessories">Accessories</option>
          <option value="others">Others</option>
        </select>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          placeholder="Location"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-500">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditItem;
