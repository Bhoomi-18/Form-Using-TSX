export const fetchAllUsers = async () => {
  const token = sessionStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const updateUser = async (userId: string, data: any) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Update failed");
  }

  return res.json();
};

export const deleteUser = async (userId: string) => {
  const token = sessionStorage.getItem("token");

  const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};