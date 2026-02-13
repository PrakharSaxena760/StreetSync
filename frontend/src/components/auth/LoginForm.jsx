import { useForm } from "react-hook-form";
import { loginUser } from "../../api/user.auth";
import { ShowToast } from "../../utils/ShowToast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/user.store";

export default function LoginForm() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const res = await loginUser(values);

    if (res.status >= 400 || res.error) {
      ShowToast(res.error?.message || "Login failed", {
        type: "error",
      });
      return;
    }

    setUser(res.data?.updateUser);
    ShowToast(res.data?.message || "Login successful", {
      type: "success",
      onClose: () => {
        navigate("/"); // redirect to homepage or dashboard
      },
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-md overflow-y-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-bold">Login</h2>

          {/* Email */}
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="border p-2 w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
