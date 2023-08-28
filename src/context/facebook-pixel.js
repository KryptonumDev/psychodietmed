"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents = ({fb_id}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(fb_id); //don't forget to change this
        ReactPixel.pageView();
      });
  }, [pathname, searchParams, fb_id]);

  return null;
};
