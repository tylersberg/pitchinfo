import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pitch Info",
  description: "Baseball analysis tool",
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex justify-between mx-8 mt-6'>
          <h1 className='text-xl pl-8'>
            Pitchinfo
          </h1>
          <input className='rounded' type='search'>
          </input>
        </div>
        {children}
        <p className="text-center mt-6">
          <ul>
          <li>Work In Progress: The database only contains a limited set of test data.</li>
          <li>Pitch data provided by Statcast API</li>
          <li>Player Information from Chadwick Baseball Bureau Persons Register: https://github.com/chadwickbureau/register</li>
          </ul>
        </p>
      </body>
    </html>
  );
}
