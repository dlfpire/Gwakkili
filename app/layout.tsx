import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeWrapper from "./themeWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "과끼리",
	description: "과끼리 웹버전",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeWrapper>{children}</ThemeWrapper>
			</body>
		</html>
	);
}
