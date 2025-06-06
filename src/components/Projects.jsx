import React, { useState, useEffect, useCallback } from 'react'
import ProjectCard from './ProjectCard'
import { ChevronDown, Filter, Code2 } from 'lucide-react'
import eCommerce from '@/app/assets/eCommerce.png'
import moviefinder from '@/app/assets/moviefinder.png'
import ps4ui from '@/app/assets/ps4ui.png'
import raft from '@/app/assets/raft.png'
import { motion } from 'framer-motion'


const projectData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full stack e-commerce solution with payment integration and user authentication.",
        image: eCommerce,
        technologies: ["React", "MongoDB", "Prisma", "Nextjs", "Tailwind", "Stripe"],
        live: "https://project-flowmazon.netlify.app/",
        github: "https://github.com/David-Jesse/project-ec"
    },
    {
        id: 2,
        title: "Recreated the User Interface for PS4",
        description: "Took a stab at recreating PS4 UI concept",
        image: ps4ui,
        technologies: ["React", "TypeScript", "Redux", "SCSS"],
        live: "https://ps4uiremake.netlify.app/",
        github: "https://github.com/David-Jesse/playstation"
    },
    {
        id: 3,
        title: "Movie Finder",
        description: "A simple movie application that fetches the most recent movies from an API",
        image: moviefinder,
        technologies: ["React", "TypeScript", "Tailwind", "Nextjs"],
        live: "https://moviiefinder.netlify.app/",
        github: "https://github.com/David-Jesse/pmf"
    },
    {
        id: 4,
        title: "Raft",
        description: "Static one-pager banking website",
        image: raft,
        technologies: ["Nextjs", "React", "Tailwind", "TypeScript"],
        live: "https://raft-finance.netlify.app/",
        github: "https://github.com/David-Jesse/raft"
    }
]

const LoadingSpinner = () => (
    <div className='flex justify-center items-center py-12'>
        <div className='flex space-x-2'>
            <div className='w-3 h-3 bg-black rounded-full animate-bounce'></div>
            <div className='w-3 h-3 bg-black rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
            <div className='w-3 h-3 bg-black rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
        </div>
    </div>
)

const Projects = () => {
    const [selectedTag, setSelectedTag] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filteredProjects, setFilteredProjects] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [shuffledProjects, setShuffledProjects] = useState([])

    // Get all unique technologies
    const getAllTechnologies = useCallback((data) => {
        const allTechnologies = new Set();
        data.forEach((project) => {
            project.technologies.forEach((tech) => {
                allTechnologies.add(tech)
            })
        })
        return [...allTechnologies].sort();
    }, [])

    const technologies = getAllTechnologies(projectData)

    // Shuffle Projects on component mount
    useEffect(() => {
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
            }
            return shuffled;
        }
        setShuffledProjects(shuffleArray(projectData))
    }, [])

    // Filter projects based on selected tag
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const filtered = selectedTag
                ? shuffledProjects.filter((project) => project.technologies.includes(selectedTag))
                : shuffledProjects;
            setFilteredProjects(filtered);
            setLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [selectedTag, shuffledProjects])

    const handleSelectTag = (tag) => {
        setSelectedTag(tag);
        setIsDropdownOpen(false)
        setShowAll(false)
    }

    const handleSeeAll = () => {
        setLoading(true)
        setTimeout(() => {
            setSelectedTag(null)
            setShowAll(true)
            setLoading(false)
        }, 500)
    }

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3)

    return (
        <section id='projects' className='py-6 bg-white  min-h-screen'>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <div className='text-center mb-16'>
                    <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
                        My Projects
                    </motion.h2>
                    <motion.p
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='text-xl text-black dark:text-white-300 max-w-3xl mx-auto'>
                        Explore my portfolio of web applications, highlighting beautiful designs, intricate code,
                        and captivating visuals. Each project reflects my skills and dedication to striving for the best and only the best.
                    </motion.p>
                </div>

                {/* Filter section */}
                <div className='flex flex-col sm:flex-row justify-between items-center mb-12 gap-4'>
                    <div className='flex items-center gap-2 text-gray-700 dark:text-black'>
                        <Filter className='w-5 h-5' />
                        <span className='font-medium'>Filter Projects:</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className='relative'>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className='flex items-center justify-between min-w-48 px-4 py-3 bg-white  border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer'
                        >
                            <span className='text-gray-900 dark:text-dark'>
                                {selectedTag || "All Technologies"}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className='absolute top-full left-0 right-0 mt-2 bg-white  border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto'>
                                <button
                                    onClick={() => handleSelectTag(null)}
                                    className='w-full px-4 py-3 text-left hover:bg-gray-50 hover:text-white dark:hover:bg-gray-700 text-gray-900 dark:text-black border-b border-gray-100 dark:border-gray-700 transition-colors'
                                >
                                    All Technologies
                                </button>
                                {technologies.map((tech, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectTag(tech)}
                                        className='w-full px-4 py-3 text-left hover:bg-gray-50 hover:text-white dark:hover:bg-gray-700 text-gray-900 dark:text-black border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors'
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
                            {displayedProjects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    handleSelectTag={handleSelectTag}
                                />
                            ))}
                        </motion.div>

                        {!showAll && filteredProjects.length > 3 && (
                            <div className='text-center'>
                                <motion.button
                                    initial={{opacity: 0}}
                                    whileInView={{opacity: 1}}
                                    transition={{delay: 1.1, duration: 0.5}}
                                    onClick={handleSeeAll}
                                    className='inline-flex items-center cursor-pointer gap-2 px-8 py-4 bg-black hover:text-gray-100 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                                >
                                    <Code2 className='w-5 h-5' />
                                    See All Projects
                                </motion.button>
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </section>
    )
}

export default Projects