import React from "react";

export default function Footer() {
  return (
    <div className="text-right p-4 text-xs text-gray-600 bg-gray-100">
      © {new Date().getFullYear()} Musdeel. Tous droits réservés.
    </div>
  );
}
