import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import EditForm from "../components/sections/edit";
import DocumentDialog from "../components/sections/dialogBox";
import AlertBox from "../components/sections/alert";
import ProfileDetails from "../components/sections/profileDetails";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/");
      return;
    }

    fetch(` https://user-registration-form-l6gx.onrender.com/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        reset(data); 
      })
      .catch(() => navigate("/"));
  }, [reset]);

  const onUpdate = async (data: any) => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    setIsUpdating(true);

    try {
      const res = await fetch(` https://user-registration-form-l6gx.onrender.com/api/user/${userId}`, {
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
      const updatedUser = await res.json();
      setUser(updatedUser);
      setIsEditing(false);

      alert("Changes saved successfully!");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsUpdating(false);
    }
  }; 

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="max-w-4xl w-full bg-gray-900 rounded-lg shadow-lg p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.photo} alt="User Photo" />
              <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-lg text-gray-300">{user.email}</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <AlertBox/>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onUpdate)} className="grid grid-cols-2 gap-6 text-base">
            <EditForm register={register} control={control} isUpdating={isUpdating} />
          </form>
        ) : (
          <>
            <ProfileDetails user={user} />

            <div className="flex flex-wrap gap-4 mt-6">
              <DocumentDialog title="ID Proof" src={user.proof} />
              <DocumentDialog title="Photo" src={user.photo} />
              <DocumentDialog title="Marksheet" src={user.marks} />
              <DocumentDialog title="Signature" src={user.sign} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}