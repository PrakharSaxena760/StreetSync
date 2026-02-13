import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { registerUser } from "../../api/user.auth";
import { ShowToast } from "../../utils/ShowToast";
import {useNavigate} from "react-router-dom";

export default function SignupForm() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      menu: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menu",
  });

  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", role);
    const address = {
      country: values.country,
      state: values.state,
      city: values.city,
    };

    formData.append("address", JSON.stringify(address));

    if (role === "vendor") {
      formData.append("stallName", values.stallName);
      formData.append("menu", JSON.stringify(values.menu));
    }

    const res = await registerUser(formData);

    if (res.status > 400 && res.error) {
      // if error occurred
      ShowToast(res.error?.message, {
        type: "error",
      });
      return;
    }

    ShowToast(res.data?.message, {
      type: "success",
      onClose: () => {
        navigate("/login"); // navigate to login upon successful signup
      },
    });

  };

  return (
    <div className="h-screen w-screen flex justify-center overflow-hidden">
      <div className="w-full max-w-md overflow-y-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold">Signup</h2>

          {/* Basic Fields */}
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="border p-2 w-full"
          />

          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="border p-2 w-full"
          />

          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="border p-2 w-full"
          />
          {/* Address Inputs */}
          <h4 className="font-semibold">Address</h4>

          <input
            {...register("country", { required: true })}
            placeholder="Country"
            className="border p-2 w-full"
          />

          <input
            {...register("state", { required: true })}
            placeholder="State"
            className="border p-2 w-full"
          />

          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="border p-2 w-full"
          />

          {/* Role Toggle */}
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>

            <label>
              <input
                type="radio"
                value="vendor"
                checked={role === "vendor"}
                onChange={() => setRole("vendor")}
              />
              Vendor
            </label>
          </div>

          {/* Vendor Fields */}
          {role === "vendor" && (
            <>
              <input
                {...register("stallName", { required: true })}
                placeholder="Stall Name"
                className="border p-2 w-full"
              />

              {/* Menu Section */}
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Menu</h4>
                <button
                  type="button"
                  onClick={() => append({ itemName: "", price: "" })}
                  className="text-xl font-bold"
                >
                  +
                </button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    {...register(`menu.${index}.itemName`, { required: true })}
                    placeholder="Item Name"
                    className="border p-2 w-full"
                  />

                  <input
                    type="number"
                    {...register(`menu.${index}.price`, { required: true })}
                    placeholder="Price"
                    className="border p-2 w-24"
                  />

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    x
                  </button>
                </div>
              ))}
            </>
          )}

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
