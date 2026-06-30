import { useState, useRef, useEffect, ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number; // active distance in pixels
  strength?: number; // strength division factor
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Check if cursor is within padding distance of the element bounds
      const isNearX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding;
      const isNearY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding;

      if (isNearX && isNearY) {
        // Active tracking
        setTransition(activeTransition);
        const targetX = distanceX / strength;
        const targetY = distanceY / strength;
        setPosition({ x: targetX, y: targetY });
      } else {
        // Snap back
        setTransition(inactiveTransition);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
