import { SpinnerOne } from "@mynaui/icons-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SpinnerOne className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
