import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
                {/* Copyright */}
                <div className='text-gray-800 text-sm mb-4 sm:mb-0'>
                    David-Jesse {currentYear}. All rights reserved.
                </div>


                {/* Social icons */}
                <div className='flex space-x-4'>
                    <Link
                        href='https://github.com/David-Jesse'
                        className='text-black hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform'
                        aria-label='github'
                        target='_blank'
                    >
                        <Github size={24} />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/david-jesse-okache-33a194327/"
                        className='text-black hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform'
                        aria-label='linkedin'
                        target='_blank'
                    >
                        <Linkedin size={24} />

                    </Link>
                </div>
            </div>


        </footer>
    )
}

export default Footer
