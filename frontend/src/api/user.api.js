import api from "./axios";

export const getMyProfile = () => {
  return api.get("/user/me");
};

export const updateMyProfile = (data) => {
  return api.put("/user/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update user password
export const updatePassword = (currentPassword, newPassword) => {
  return api.put("/user/update-password", { currentPassword, newPassword });
};
