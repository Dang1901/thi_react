import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRouter = ({ children }: Props) => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return <>{children}</>;
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyan-700">
        <div className="p-8 bg-white rounded-lg shadow-xl">
          <div className="mb-4 text-lg font-semibold text-gray-700 text-center">
            Bạn không có quyền truy cập
          </div>
          <div className="flex flex-col items-center">
            <Link to={"/login"}>
              <button
                type="submit"
                className="mb-2 w-40 px-4 py-2 text-white bg-red-500 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Login
              </button>
            </Link>
            <Link to={"register"}>
              <button
                type="submit"
                className="w-40 px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default PrivateRouter;
