import React from "react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <span className="loader"></span>
    </div>
  );
}
