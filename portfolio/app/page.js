'use client'
import React, { useEffect, useState } from 'react';
import './globals.css'
import Bkg from './components/Header/background';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience'
import Footer from './components/Footer';

export default function Home() {
  const [mode, setMode] = useState("dark");

	useEffect(() => {
		let storedMode = localStorage.getItem("landingColorMode");
		if (storedMode !== null) {
			setMode(storedMode);
		}

		const intervalId = setInterval(() => {
			let storedMode = localStorage.getItem("landingColorMode");
			if (storedMode !== null) {
				setMode(storedMode);
			}
      console.log(storedMode)
		}, 250);

		return () => clearInterval(intervalId);
	}, []);

  return (
    <main>
      <div className={`h-screen w-screen ${mode == 'dark' ? 'bg-[#0b0d11]' : 'bg-[#F1F1F1]'}`}>
				<div className='fixed z-[-2]'>
					<Bkg colorMode={mode} />
				</div>
        <div className="sticky w-full top-0 z-[100]">
          <Header colorMode={mode} />
        </div>
        <div className="w-[100svw]" id="home">
          <Hero colorMode={mode} />
        </div>
        <div className="w-[100svw]" id="experience">
          <Experience colorMode={mode} />
        </div>
        <div className="z-[15]">
          <Footer colorMode={mode} />
        </div>
      </div>
    </main>
  );
}
