"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  type ICloud,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud";

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

const renderCustomIcon = (icon: SimpleIcon) =>
  renderSimpleIcon({
    icon,
    bgHex: "#080510",
    fallbackHex: "#ffffff",
    minContrastRatio: 2,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: { preventDefault: () => void }) => e.preventDefault(),
    },
  });

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export function IconCloud({ iconSlugs }: { iconSlugs: string[] }) {
  const [data, setData] = useState<IconData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSimpleIcons({ slugs: iconSlugs }).then((icons) => {
      if (!cancelled) setData(icons);
    });
    return () => {
      cancelled = true;
    };
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon),
    );
  }, [data]);

  return (
    <div className="grayscale contrast-125">
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Cloud {...cloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    </div>
  );
}
