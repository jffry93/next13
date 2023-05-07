import "./globals.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";


export const metadata: Metadata = {
	title: {
		default: "movie night",
		template: "%s | movienight.com",
	},
	description: "A platform to track movies you've watched and want to watch.",
	openGraph: {
		title: "movienight.com",
		description:
			"A platform to track movies you've watched and want to watch.",
		url: "https://movienight.com",
		siteName: "movienight.com",
		images: [
			{
				url: "https://movienight.com/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-CA",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Movie Night",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/popcorn.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}