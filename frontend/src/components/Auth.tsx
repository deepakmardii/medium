import { SignupInput } from "@deepakmardi22/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log("Error inputs");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="p-8 text-center">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Dont have an account?"
                : "Already have an account?"}
              <Link
                className="underline underline-offset-2 pl-2"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          <div>
            <LabelInput
              label="Name"
              placeholder="Deepak Mardi..."
              onChange={(e) => {
                setPostInputs({ ...postInputs, name: e.target.value });
              }}
            />
            <LabelInput
              label="Username"
              placeholder="deepakmardi@gmail.com"
              onChange={(e) => {
                setPostInputs({ ...postInputs, username: e.target.value });
              }}
            />
            <LabelInput
              type="password"
              label="Password"
              placeholder="123456789"
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "SIGN UP" : "SIGN IN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <label className="block mb-2 font-bold text-gray-900 pt-5">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
