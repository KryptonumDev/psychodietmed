"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let pixelInitialized = false;
let ReactPixelModule = null;

export const FacebookPixelEvents = ({fb_id}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  // Initialize pixel only once after initial page load
  useEffect(() => {
    if (pixelInitialized) return;
    
    // Delay pixel loading to not block initial render
    const timeoutId = setTimeout(() => {
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixelModule = ReactPixel;
          ReactPixel.init(fb_id);
          ReactPixel.pageView();
          pixelInitialized = true;
        });
    }, 2000); // 2 second delay after page load

    return () => clearTimeout(timeoutId);
  }, [fb_id]);

  // Track subsequent page views
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (pixelInitialized && ReactPixelModule) {
      ReactPixelModule.pageView();
    }
  }, [pathname, searchParams]);

  return null;
};
