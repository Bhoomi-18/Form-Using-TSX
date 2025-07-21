export const fetchUser = async () => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  return await res.json();
};