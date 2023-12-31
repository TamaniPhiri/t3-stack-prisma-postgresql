import { useState } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameTopUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //add functions
  const fetchAllUsers = api.example.getAll.useQuery();
  const fetchOneUser = api.example.getOne.useQuery();

  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  //handlers
  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        name: name,
        email: email,
      });
      setName("");
      setEmail("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
      });
      setUserIdToUpdate("");
      setNameTopUpdate("");
      setEmailToUpdate("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      await fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-full min-h-screen flex-col items-center justify-center gap-3 bg-gradient-to-bl from-slate-900 via-slate-700 to-slate-800 px-4 text-white md:px-10">
        {/* Get all Users */}
        <button
          className="rounded-md bg-green-200 p-2 text-black"
          onClick={() => fetchAllUsers.refetch()}
        >
          Get all users
        </button>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <div className="grid w-full grid-cols-3 justify-between rounded-md border px-5 py-2">
            <div>id</div>
            <div>name</div>
            <div>email</div>
          </div>
          {fetchAllUsers.data?.map((user) => (
            <div
              key={user.id}
              className="grid w-full grid-cols-3 justify-evenly border-b px-5 py-2"
            >
              <div>{user.id}</div>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
          ))}
        </div>
        {/* Get one User*/}
        <div className="mt-7 flex w-full flex-col items-center justify-center gap-3">
          <h1>Get one user</h1>
          <div>
            <input
              className="rounded-md p-2 text-black placeholder-gray-600"
              placeholder="Enter user id"
              value={userId || ""}
              onChange={(e) => setUserId(String(e.target.value))}
            />
            <button
              className="rounded-md bg-green-200 p-2 text-black"
              onClick={() => fetchOneUser.refetch()}
            >
              Search
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
          {fetchOneUser.data&&(
            <div>
              <p>Name:{fetchOneUser.data.name}</p>
              <p>Name:{fetchOneUser.data.email}</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
