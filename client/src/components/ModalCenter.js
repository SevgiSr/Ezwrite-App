import { useState } from "react";
import StyledModalCenter from "./styles/ModalCenter.styled";
import { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalCenter = ({ isOpen, setIsOpen, content, width }) => {
  const overlayRef = useRef(null);
  const isOpenRef = useRef(isOpen);

  // Update isOpenRef whenever isOpen changes
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const listener = (e) => {
    if (overlayRef.current && e.target === overlayRef.current) {
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
    <StyledModalCenter width={width}>
      <div ref={overlayRef} className="overlay"></div>
      <div className="modal-content">
        {content}
        <div className="close-modal-btn" onClick={() => setIsOpen(false)}>
          <AiOutlineClose />
        </div>
      </div>
    </StyledModalCenter>
  );
};

export default ModalCenter;
