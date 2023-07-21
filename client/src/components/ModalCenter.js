import { useState } from "react";
import StyledModalCenter from "./styles/ModalCenter.styled";
import { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalCenter = ({ isOpen, setIsOpen, content }) => {
  const overlayRef = useRef(null);
  console.log(isOpen);
  const isOpenRef = useRef(isOpen);

  // Update isOpenRef whenever isOpen changes
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const listener = (e) => {
    if (
      e.target === overlayRef.current ||
      overlayRef.current.contains(e.target)
    ) {
      setIsOpen(false);
      isOpenRef.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <StyledModalCenter>
      <div ref={overlayRef} className="overlay"></div>
      <div className="content">
        {content}
        <div className="close-modal-btn" onClick={() => setIsOpen(false)}>
          <AiOutlineClose />
        </div>
      </div>
    </StyledModalCenter>
  );
};

export default ModalCenter;
