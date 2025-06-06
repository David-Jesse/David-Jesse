import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Technologies = () => {
    const technologies = [
        {
            name: 'HTML',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
            color: '#E34F26'
        },
        {
            name: 'CSS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
            color: '#1572B6'
        },
        {
            name: 'Tailwind CSS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
            color: '#06B6D4'
        },
        {
            name: 'React',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
            color: '#61DAFB'
        },
        {
            name: 'MongoDB',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
            color: '#47A248'
        },
        {
            name: 'Sass',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
            color: '#CC6699'
        },
        {
            name: 'Git',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
            color: '#F05032'
        },
        {
            name: 'Next.js',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
            color: '#000000'
        },
        {
            name: 'TypeScript',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
            color: '#3178C6'
        }
    ]

    return (
        <section className='md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            {/* Section header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-center mb-16'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
                    Technologies I use
                </h2>

                <motion.p
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className='text-lg text-gray-600 max-w-2xl mx-auto'>Here are the tools and technologies I work with to bring ideas to life</motion.p>
            </motion.div>

            {/* Technologies grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{opacity: 1 }}
                transition={{ duration: 0.8}}
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8'>
                {technologies.map((tech, index) => (
                    <div
                        key={tech.name}
                        className='group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'
                        style={{
                            animationDelay: `${index * 100}ms`
                        }}
                    >
                        {/* Gradient Background on Hover */}
                        <div
                            className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300'
                            style={{
                                background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}05)`
                            }}
                        ></div>

                        {/* Icons */}
                        <div className='relative z-10 flex flex-col items-center'>
                            <div className=' relative w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform duration-300'>
                                <Image
                                    src={tech.icon}
                                    alt={`${tech.name} icon`}
                                    fill
                                    className='w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-300'
                                />
                            </div>

                            {/* Name of Tech */}
                            <h3 className='text-sm sm:text-base font-semibold text-gray-800 text-center group-hover:text-gray-900 transition-colors duration-300'>
                                {tech.name}
                            </h3>
                        </div>

                        {/* Subtle gradient on hover */}
                        <div
                            className='absolute inset-x-0 bottom-0 h-1 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            style={{ backgroundColor: tech.color }}
                        ></div>
                    </div>
                ))}
            </motion.div>


        </section>
    )
}

export default Technologies;