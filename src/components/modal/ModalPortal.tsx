// src/components/modal/ModalPortal.tsx
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
  containerId: string;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children, containerId }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existingContainer = document.getElementById(containerId);
    if (existingContainer instanceof HTMLDivElement) {
      containerRef.current = existingContainer;
    } else {
      const newContainer = document.createElement('div');
      newContainer.id = containerId;
      document.body.appendChild(newContainer);
      containerRef.current = newContainer;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [containerId]);

  if (!containerRef.current) return null;

  return createPortal(children, containerRef.current);
};

export default ModalPortal;