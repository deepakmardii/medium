import { SignupInput } from "@deepakmardi22/medium-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className="text-slate-400">
            Already have an account?
            <Link className="underline pl-2" to={"/sighin"}>
              Login
            </Link>
          </div>
        </div>
        <LabelInput
          type="text"
          label="Name"
          placeholder="Deepak Mardi..."
          onChange={(e) => {
            setPostInputs((c) => ({ ...c, name: e.target.value }));
          }}
        />
        <LabelInput
          type="text"
          label="Username"
          placeholder="deepakmardi@gmail.com"
          onChange={(e) => {
            setPostInputs((c) => ({ ...c, username: e.target.value }));
          }}
        />
        <LabelInput
          type="password"
          label="Password"
          placeholder="password"
          onChange={(e) => {
            setPostInputs((c) => ({ ...c, password: e.target.value }));
          }}
        />
      </div>
    </div>
  );
};

export default Auth;

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
