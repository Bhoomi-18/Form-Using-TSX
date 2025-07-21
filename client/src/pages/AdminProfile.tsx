import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordian";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import EditForm from "../components/sections/edit"; 
import ProfileDetails from "../components/sections/profileDetails";
import { fetchAllUsers, updateUser, deleteUser } from "../lib/api/fetchAllUser"; 

export default function AdminProfile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [editTarget, setEditTarget] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userEmail = sessionStorage.getItem("email");
    if (!token || userEmail !== "bhoomi@admin.com") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchAllUsers()
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error("Error fetching users:", err);
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    if (editTarget) reset(editTarget);
  }, [editTarget, reset]);

  const onUpdate = async (data: any) => {
    setIsUpdating(true);
    try {
      const updated = await updateUser(editTarget._id, data);
      setUsers((prev) =>
        prev.map((u) => (u._id === editTarget._id ? updated : u))
      );
      setEditTarget(null);
      alert("User updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-black text-white space-y-6">
      <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>

      {users.map((user) => (
        <Accordion type="single" collapsible key={user._id} className="bg-gray-900 rounded-lg p-4">
          <AccordionItem value={user._id}>
            <AccordionTrigger className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <ProfileDetails user={user} />

              <div className="flex gap-3">
                <Button onClick={() => setEditTarget(user)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(user._id)}>Delete</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onUpdate)} className="grid grid-cols-2 gap-6">
            <EditForm register={register} control={control} isUpdating={isUpdating} />
            <div className="col-span-2 flex justify-end">
              <DialogClose asChild>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}