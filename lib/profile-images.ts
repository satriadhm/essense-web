import type { StaticImageData } from "next/image";
import pp1 from "@/assets/profile/pp1.jpg";
import pp2 from "@/assets/profile/pp2.jpg";
import pp3 from "@/assets/profile/pp3.jpg";
import pp4 from "@/assets/profile/pp4.jpg";
import pp5 from "@/assets/profile/pp5.jpg";

/**
 * Bundled profile photos (imported assets). Use these instead of `/pp*.jpg` strings
 * so images are always emitted with the build — deployment cannot “forget” public files
 * that were never committed.
 *
 * Order: 1 male japan, 2 male chinese, 3 female latino, 4 female filipino, 5 male white
 */
export const profileImagesOrdered: readonly StaticImageData[] = [
  pp1,
  pp2,
  pp3,
  pp4,
  pp5,
];

export const profileImageSrc = {
  maleJapan: pp1.src,
  maleChinese: pp2.src,
  femaleLatino: pp3.src,
  femaleFilipino: pp4.src,
  maleWhite: pp5.src,
} as const;
