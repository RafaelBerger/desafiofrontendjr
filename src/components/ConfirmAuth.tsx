import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ConfirmAuthProps {
  children: ReactNode;
}

export default function ConfirmAuth({ children }: ConfirmAuthProps) {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth !== "true") {
    return <Navigate to={"/"} />;
  }
  return children;
}
