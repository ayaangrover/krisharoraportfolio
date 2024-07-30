import React, { useState, useEffect, useRef } from 'react';

const timelineEvents = [
	"First Event",
	"Second Event",
	"Third Event",
	"Fourth Event",
	"Fifth Event"
];

export default function Timeline({ colorMode }) {
	const isDarkMode = colorMode === 'dark';
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef(null);
	const timelineRef = useRef(null);
	const event1 = useRef(null);
	const event2 = useRef(null);
	const event3 = useRef(null);
	const event4 = useRef(null);
	const event5 = useRef(null);

	const textColor = isDarkMode ? 'text-white' : 'text-black';
	const borderColor = isDarkMode ? "border-[#636363]" : "border-gray-300";
	const glowColor = isDarkMode ? "drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]" : "drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]";

	useEffect(() => {
		let lastScrollTop = 0;
		let isSnapping = false;
	
		const handleScroll = () => {
			if (isSnapping) return;
	
			const scrollPosition = window.scrollY;
			const viewportHeight = window.innerHeight;
	
			if (containerRef.current && timelineRef.current) {
				const containerRect = containerRef.current.getBoundingClientRect();
				const containerTop = containerRect.top + scrollPosition;
				const containerBottom = containerRect.bottom + scrollPosition;
	
				if (scrollPosition < containerTop) {
					timelineRef.current.style.position = 'absolute';
				} else if (scrollPosition + viewportHeight > containerBottom) {
					timelineRef.current.style.position = 'absolute';
				} else {
					timelineRef.current.style.position = 'fixed';
				}
			}
	
			const eventTops = [
				event1.current.getBoundingClientRect().top + scrollPosition - viewportHeight / 2,
				event2.current.getBoundingClientRect().top + scrollPosition - viewportHeight / 2,
				event3.current.getBoundingClientRect().top + scrollPosition - viewportHeight / 2,
				event4.current.getBoundingClientRect().top + scrollPosition - viewportHeight / 2,
				event5.current.getBoundingClientRect().top + scrollPosition - viewportHeight / 2
			];
	
			if (scrollPosition >= containerRef.current.offsetTop && scrollPosition + viewportHeight <= containerRef.current.offsetTop + containerRef.current.offsetHeight) {
				let currentIndex
				if (scrollPosition >= eventTops[4]) {
					currentIndex = 4
				} else if (scrollPosition >= eventTops[3]) {
					currentIndex = 3
				} else if (scrollPosition >= eventTops[2]) {
					currentIndex = 2
				} else if (scrollPosition >= eventTops[1]) {
					currentIndex = 1
				} else if (scrollPosition >= eventTops[0]) {
					currentIndex = 0
				}
	
				if (scrollPosition > lastScrollTop && currentIndex < eventTops.length - 1) {
					// Scrolling down
					isSnapping = true;
					window.scrollTo(0, eventTops[currentIndex + 1] + viewportHeight / 2);
					setActiveIndex(currentIndex + 1);
				} else if (scrollPosition < lastScrollTop && currentIndex > 0) {
					// Scrolling up
					isSnapping = true;
					window.scrollTo(0, eventTops[currentIndex - 1] + viewportHeight / 2);
					setActiveIndex(currentIndex - 1);
				}
			} else {
				if (scrollPosition >= eventTops[4]) {
					setActiveIndex(4);
				} else if (scrollPosition >= eventTops[3]) {
					setActiveIndex(3);
				} else if (scrollPosition >= eventTops[2]) {
					setActiveIndex(2);
				} else if (scrollPosition >= eventTops[1]) {
					setActiveIndex(1);
				} else if (scrollPosition >= eventTops[0]) {
					setActiveIndex(0);
				}
			}
	
			lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
	
			setTimeout(() => {
				isSnapping = false;
			}, 1000);
		}
	
		window.addEventListener('scroll', handleScroll);
		handleScroll();
	
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div ref={containerRef} className={`relative ${textColor} w-full overflow-hidden`}>
			<div
				ref={timelineRef}
				className="absolute left-1/2 -translate-x-1/2 w-3/4"
				style={{ top: '100px' }}
			>
				<div className={`h-0.5 ${borderColor} w-full absolute top-1.5`}></div>
				{timelineEvents.map((event, index) => (
					<div
						key={index}
						className={`absolute w-3 h-3 rounded-full cursor-pointer ${index === activeIndex ? 'bg-blue-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
							}`}
						style={{
							left: `calc(${(index / (timelineEvents.length - 1)) * 100}% - 6px)`,
							top: '0'
						}}
						onClick={() => setActiveIndex(index)}
					>
						<span className={`${index === activeIndex ? glowColor : textColor} absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm`}>
							{event}
						</span>
					</div>
				))}
			</div>

			<div ref={event1} className={`${textColor} flex justify-center items-center h-screen w-screen`}>
				Content placeholder for event 1
			</div>

			<div ref={event2} className={`${textColor} flex justify-center items-center h-screen w-screen`}>
				Content placeholder for event 2
			</div>

			<div ref={event3} className={`${textColor} flex justify-center items-center h-screen w-screen`}>
				Content placeholder for event 3
			</div>

			<div ref={event4} className={`${textColor} flex justify-center items-center h-screen w-screen`}>
				Content placeholder for event 4
			</div>

			<div ref={event5} className={`${textColor} flex justify-center items-center h-screen w-screen`}>
				Content placeholder for event 5
			</div>
		</div>
	);
}