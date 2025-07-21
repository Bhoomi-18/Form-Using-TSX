export async function registerUser(data: any) {
  const formData = new FormData();

  for (const key in data) {
    if (
      key !== "photo" &&
      key !== "proof" &&
      key !== "marks" &&
      key !== "sign"
    ) {
      if (key === "phone" || key === "parentInfo") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  formData.append("photo", data.photo?.[0]);
  formData.append("proof", data.proof?.[0]);
  formData.append("marks", data.marks?.[0]);
  formData.append("sign", data.sign?.[0]);

  const res = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText);
  }

  return await res.text();
}