"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isShow: boolean;
  onClose: (status: boolean) => void;
};

const Modal = ({ children, isShow, onClose }: Props) => {
  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose(false);
  };

  return (
    <div
      className={`w-full min-h-dvh z-[1024] bg-black/60 fixed top-0 left-0 ${
        isShow ? `flex` : `hidden`
      } justify-center items-center`}
      onClick={handleClickOutside}
    >
      <div className="w-5/6 lg:w-2/6 overflow-auto max-h-full bg-white rounded-4xl">
        {children}
      </div>
    </div>
  );
};

export default Modal