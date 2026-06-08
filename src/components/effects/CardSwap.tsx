"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";

export interface CardSwapProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  delay?: number;
  pauseOnHover?: boolean;
  onActiveChange?: (index: number) => void;
  className?: string;
}

type CardProps = { className?: string; style?: React.CSSProperties };

export default function CardSwap({
  children,
  width = "100%",
  height = 480,
  delay = 4500,
  pauseOnHover = true,
  onActiveChange,
  className,
}: CardSwapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const childArr = Children.toArray(children);
  const count = childArr.length;
  const [order, setOrder] = useState(() => childArr.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const orderRef = useRef(order);
  orderRef.current = order;

  const layoutCards = useCallback(
    (currentOrder: number[], animate = true) => {
      const container = containerRef.current;
      if (!container) return;
      const cards = container.querySelectorAll<HTMLElement>(".card-swap-item");

      currentOrder.forEach((childIndex, stackPos) => {
        const card = cards[childIndex];
        if (!card) return;
        const y = stackPos * 18;
        const scale = 1 - stackPos * 0.04;
        const zIndex = count - stackPos;
        const rotateX = stackPos * -4;
        const opacity = 1 - stackPos * 0.12;

        if (animate) {
          gsap.to(card, {
            y,
            scale,
            zIndex,
            rotateX,
            opacity,
            duration: 0.7,
            ease: "power3.out",
          });
        } else {
          gsap.set(card, { y, scale, zIndex, rotateX, opacity });
        }
      });
    },
    [count]
  );

  const swap = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev.slice(1), prev[0]];
      layoutCards(next);
      onActiveChange?.(next[0]);
      return next;
    });
  }, [layoutCards, onActiveChange]);

  useEffect(() => {
    layoutCards(orderRef.current, false);
    onActiveChange?.(orderRef.current[0]);
  }, [count, layoutCards, onActiveChange]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(swap, delay);
    return () => clearInterval(id);
  }, [paused, swap, delay, count]);

  return (
    <div
      ref={containerRef}
      className={`card-swap-container ${className ?? ""}`}
      style={{ width, height }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {childArr.map((child, i) => {
        if (!isValidElement(child)) return null;
        const el = child as ReactElement<CardProps>;
        return (
          <div key={i} className="card-swap-item" data-index={i}>
            {cloneElement(el, {
              className: `${el.props.className ?? ""} h-full w-full`.trim(),
            })}
          </div>
        );
      })}
    </div>
  );
}
