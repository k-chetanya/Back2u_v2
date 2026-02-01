import api from "./axios";

export const getItemById = (id) => {
  return api.get(`/item/${id}`);
};

export const updateItemById = (id, data) => {
  return api.put(`/item/${id}`, data);
};

export const resolveItemById = (id) => {
  return api.patch(`/item/resolve/${id}`);
};

export const getLostItems = (category = "") => {
  return api.get(`/item`, {
    params: {
      type: "lost",
      category,
    },
  });
};

export const getFoundItems = (category = "") => {
  return api.get("/item", {
    params: {
      type: "found",
      category,
    },
  });
};

export const getDashboardStats = () => {
  return api.get("/item/dashboard/stats");
};


export const updateItem = (id, data) => {
  return api.put(`/item/${id}`, data);
};

// Create a new item (lost or found)
export const createItem = (data) => {
  return api.post("/item/create", data); // FormData with image allowed
};

// Get items reported by the logged-in user
export const getMyItems = () => {
  return api.get("/my-items"); // withCredentials handled in api.js if needed
};