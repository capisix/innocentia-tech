"use client";

import React, { useState, useEffect } from "react";

export const motion = new Proxy({} as any, {
  get: (_, tag: string) => {
    const Component = React.forwardRef<any, any>(({
      initial,
      animate,
      whileInView,
      whileHover,
      transition,
      viewport,
      style,
      children,
      className,
      ...props
    }, ref) => {
      const Tag = (tag as any) || "div";
      const [mounted, setMounted] = useState(false);
      const [hovered, setHovered] = useState(false);

      useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 30);
        return () => clearTimeout(timer);
      }, []);

      const activeState = hovered && whileHover
        ? { ...initial, ...animate, ...whileHover }
        : mounted && (animate || whileInView)
        ? { ...initial, ...animate }
        : initial || {};

      const inlineStyle: React.CSSProperties = { ...style };

      if (activeState) {
        let transformStr = "";
        if (activeState.scale !== undefined) transformStr += ` scale(${activeState.scale})`;
        if (activeState.y !== undefined) transformStr += ` translateY(${activeState.y}px)`;
        if (activeState.x !== undefined) transformStr += ` translateX(${activeState.x}px)`;
        if (activeState.rotate !== undefined) transformStr += ` rotate(${activeState.rotate}deg)`;

        if (transformStr) inlineStyle.transform = transformStr.trim();
        if (activeState.opacity !== undefined) inlineStyle.opacity = activeState.opacity;
      }

      const duration = transition?.duration ?? 0.5;
      const delay = transition?.delay ?? 0;
      inlineStyle.transition = `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;

      return (
        <Tag
          ref={ref}
          className={className}
          style={inlineStyle}
          onMouseEnter={(e: any) => {
            setHovered(true);
            props.onMouseEnter?.(e);
          }}
          onMouseLeave={(e: any) => {
            setHovered(false);
            props.onMouseLeave?.(e);
          }}
          {...props}
        >
          {children}
        </Tag>
      );
    });
    Component.displayName = `motion.${tag}`;
    return Component;
  }
});

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;
