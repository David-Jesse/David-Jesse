import { assets } from '@/app/assets/assets'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hero = () => {
    const [displayText, setDisplayText] = useState('')
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const sequences = [
        "Hi! I'm David-Jesse",
        "Welcome!"
    ]

    const typeSpeed = 50;
    const deleteSpeed = 30;
    const pauseDuration = 1000;

    useEffect(() => {
        const currentText = sequences[currentSequenceIndex];

        if (isPaused) {
            const pauseTimer = setTimeout(() => {
                setIsPaused(false)
                setIsDeleting(true)
            }, pauseDuration);
            return () => clearTimeout(pauseTimer);
        }

        if (!isDeleting && displayText === currentText) {
            setIsPaused(true);
            return;
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setCurrentSequenceIndex((prev) => (prev + 1) % sequences.length);
            return;
        }

        const timer = setTimeout(() => {
            if (isDeleting) {
                setDisplayText(currentText.substring(0, displayText.length - 1));
            } else {
                setDisplayText(currentText.substring(0, displayText.length + 1))
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timer);
    }, [displayText, currentSequenceIndex, isDeleting, isPaused, sequences])

    const smoothScrollTo = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navHeight = 80;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section id='hero' className='min-h-screen flex items-center justify-center px-4'>
            <div className='text-center max-w-4xl mx-auto'>
                <h1 className='text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-6 md:mb-8 lg:mb-12'>
                    <span className='inline-block min-h-[1.2em'>
                        {displayText}
                        <span className='animate-pulse text-black ml-1'>|</span>
                    </span>
                </h1>

                <div className='mb-8 sm:mb-12 pt-10'>
                    <motion.h3
                        initial={{ y: -30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className='text-xl sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-4xl mb-3'>
                        WELCOME TO DJ's CORNER OF THE WEB, WHERE THE ART OF FUNCTIONAL FRONTEND
                        DEVELOPMENT TAKES CENTER STAGE. EXPLORE A WORLD OF DIGITAL SOLUTIONS DESIGNED FOR
                        SEAMLESS USER EXPERIENCES. LET'S DIVE INTO THE WORLD OF PRACTICAL AND USER-FRIENDLY WEB APPLICATIONS
                    </motion.h3>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4'>
                    <motion.button
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        href="#projects" className='cursor-pointer w-[50%] sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border-transparent border rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2' onClick={() => smoothScrollTo('projects')}>
                        EXPLORE PROJECTS
                    </motion.button>

                    <motion.a
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7}}
                        href="/david-jesse-resume.pdf" download="David-Jesse-Resume" target="_blank" rel="noopener noreferrer" className='w-[44%] sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border rounded-full border-gray-500 duration-300 flex items-center sm:text-base focus:outline-none focus:ring-offset-2 focus:ring-gray-400 gap-2 hover:bg-gray-50'>My Resume <Image src={assets.download_icon} alt='right arrow' className='w-4' />
                    </motion.a>
                </div>
            </div>
        </section>
    )
}

export default Hero;