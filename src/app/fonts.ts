import { Bricolage_Grotesque, Inter } from "next/font/google";

const heading = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const fontVariables = `${heading.variable} ${body.variable}`;
