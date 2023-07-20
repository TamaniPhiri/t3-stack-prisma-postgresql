import { useState } from "react";

export default function Home() {

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[nameToUpdate,setNameTopUpdate]=useState("");
  const[emailToUpdate,setEmailToUpdate]=useState("");
  const[userId,setUserId]=useState("");
  const[userIdToUpdate,setUserIdToUpdate]=useState("");
  const[userIdToDelete,setUserIdToDelete]=useState("");

  return (
    <>
      <div>
        hello
      </div>
    </>
  );
}
