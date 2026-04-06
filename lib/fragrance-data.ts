import { profileImageSrc } from "@/lib/profile-images";

export type NoteTier = "top" | "heart" | "base";

export interface FragranceProfile {
  id: string;
  name: string;
  family: "floral" | "woody" | "fresh" | "oriental";
}

export const exampleFragrances: FragranceProfile[] = [
  { id: "1", name: "YSL Y", family: "fresh" },
  { id: "2", name: "L'Oréal Homme Intense", family: "fresh" },
  { id: "3", name: "L'Oréal Homme Sport", family: "fresh" },
];

export const noteTierExamples: Record<
  NoteTier,
  { label: string; examples: string[]; timeline: string }
> = {
  top: {
    label: "TOP NOTES",
    examples: ["Bergamot", "Citrus", "Ginger", "Neroli"],
    timeline: "First 5–20 min — volatile, first impression",
  },
  heart: {
    label: "HEART NOTES",
    examples: ["Lavender", "Rose", "Jasmine", "Spice"],
    timeline: "20 min–hours — character of the scent",
  },
  base: {
    label: "BASE NOTES",
    examples: ["Patchouli", "Sandalwood", "Musk", "Vanilla"],
    timeline: "Hours to days — dry-down, sillage",
  },
};

export const communityPosts = [
  {
    id: "1",
    user: "@scentlover_jp",
    tag: "#floral",
    text: "Finally found my signature — Creed Aventus in July heat actually works for me. Essense nailed the timing suggestion. 🌸",
    likes: 18,
    comments: 8,
    shares: 3,
    formula: true,
    avatarSrc: profileImageSrc.maleJapan,
  },
  {
    id: "2",
    user: "@perfumegeek",
    tag: "#woody",
    text: "Weather-aware dosing is real. Hot day + Acqua di Gio = disaster. Essense moved me to Tom Ford Oud Wood and I've never gotten so many compliments.",
    likes: 31,
    comments: 12,
    shares: 5,
    formula: false,
    avatarSrc: profileImageSrc.maleChinese,
  },
  {
    id: "3",
    user: "@monicaw",
    tag: "#oriental",
    text: "Mia suggested I try a base-heavy formula for my evening meeting. Best confidence hack I've discovered.",
    likes: 22,
    comments: 6,
    shares: 2,
    formula: true,
    avatarSrc: profileImageSrc.femaleLatino,
  },
  {
    id: "4",
    user: "@fragrancemaven",
    tag: "#floral",
    text: "Love the journal tracking. I wear florals in spring, orientals in winter — didn't notice until Essense showed me the pattern.",
    likes: 44,
    comments: 15,
    shares: 7,
    formula: false,
    avatarSrc: profileImageSrc.femaleFilipino,
  },
  {
    id: "5",
    user: "@urbanscent",
    tag: "#fresh",
    text: "The biometric scan is genuinely impressive. Picks up stress conductance — I test higher on Mondays 😭",
    likes: 27,
    comments: 9,
    shares: 4,
    formula: false,
    avatarSrc: profileImageSrc.maleWhite,
  },
  {
    id: "6",
    user: "@essensefan_sg",
    tag: "#woody",
    text: "Join the Essense Club. I'm at 340 points. Almost at Gold tier.",
    likes: 19,
    comments: 4,
    shares: 1,
    formula: false,
    avatarSrc: profileImageSrc.maleChinese,
  },
];

export const suggestedUsers = [
  {
    name: "Kenji Yamamoto",
    tag: "Tokyo · fresh florals",
    imageSrc: profileImageSrc.maleJapan,
  },
  {
    name: "Wei Zhang",
    tag: "Shanghai · woody blends",
    imageSrc: profileImageSrc.maleChinese,
  },
  {
    name: "Sofia Ruiz",
    tag: "Citrus curator",
    imageSrc: profileImageSrc.femaleLatino,
  },
  {
    name: "Ana Reyes",
    tag: "Manila · layering coach",
    imageSrc: profileImageSrc.femaleFilipino,
  },
  {
    name: "Lukas Berg",
    tag: "Nordic minimalist",
    imageSrc: profileImageSrc.maleWhite,
  },
];
