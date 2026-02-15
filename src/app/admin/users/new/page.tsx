"use client";
import Form from "@/components/form/Form";
import { createNewUser } from "../_services/UserService";
import { FormEvent, useReducer } from "react";
import { UIReducer } from "../../reducer/AdminReducer";

export default function NewUserPage() {
  const [, dispatch] = useReducer(UIReducer, { showErrorAlert: false });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createNewUser(formData);
    } catch (error: Error | unknown) {
      console.error("Error creating user:", error);
      dispatch({
        type: "SHOW_ERROR_ALERT",
        payload: error instanceof Error ? error.message : "Failed to create user.",
      });
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Add New User</h1>
      <div className="rounded bg-white p-6 shadow">
        <Form onSubmit={handleSubmit}>
          <input name="name" placeholder="Username" className="mb-4 w-full border p-2" />
          <input name="email" placeholder="Email" className="mb-4 w-full border p-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 w-full border p-2"
          />
          <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
            Create User
          </button>
        </Form>
      </div>
    </div>
  );
}
