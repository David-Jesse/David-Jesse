import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { assets } from '@/app/assets/assets';
import Image from 'next/image';
import union from '@/app/assets/union.png'

function Nav() {
  const [scrollDown, setScrollDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navVisible, setNavVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const smoothScrollTo = (targetId) => {
    if (targetId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navHeight = 80;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    }
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const heroSection = document.getElementById('hero')
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;

      // Scroll States 
      const isAtTop = scrollTop < 50;
      const isInHero = scrollTop < heroHeight - 100;
      const isScrollingDown = scrollTop > lastScrollY;

      // Set scroll styling 
      setScrollDown(scrollTop > 50 && isInHero);

      // Set navigation visibility
      if (isAtTop) {
        setNavVisible(true);
      } else if (isInHero) {
        setNavVisible(true)
      } else {
        if (isScrollingDown) {
          setNavVisible(false);
        } else {
          setNavVisible(true);
        }
      }

      // Update last scroll position
      setLastScrollY(scrollTop);

      const sections = ['home', 'projects', 'contact'];
      const navHeight = 80;

      // If we're at the very top of the page, set active section to home
      if (scrollTop < 100) {
        setActiveSection('home');
        return;
      }

      // Check other sections
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] === 'home') continue;

        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop - navHeight - 100;
          if (scrollTop >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  // Determine Nav classes based on state
  const getNavClasses = () => {
    let baseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out'

    if (!navVisible) {
      baseClasses += ' -translate-y-full opacity-0'
    }

    if (scrollDown) {
      baseClasses += " left-1/2 transform -translate-x-1/2 bg-white/80 shadow-2xl backdrop-blur-md border border-gray-200/50 rounded-full mt-4 w-[90%] max-w-6xl"
    } else {
      baseClasses += " left-0 right-0 bg-white w-full"
    }

    return baseClasses;
  }

  return (
    <>
      <div className='fixed top-0 right-0 left-0 w-11/12 -z-10 translate-y-[-8%]'>
        <Image
          src={assets.header_bg_color}
          alt='background-color'
          className='w-full'
        />
      </div>
      <header
        className={getNavClasses()}
        style={{ boxShadow: scrollDown ? "20px 20px 40px -6px rgba(0,0,0,0.1)" : "" }}
      >
        <div className='w-full mx-auto px-4 py-2 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <button
              href='/'
              className='flex-shrink-0'
            >
              <Image
                src={union}
                loading='lazy'
                alt='David Jesse'
                className={`transition-all duration-300 ${scrollDown ? 'h-10 w-auto' : 'h-12 w-auto'
                  }`}
              />
            </button>

            {/* Desktop Navigation */}
            <nav className='hidden cursor-pointer md:flex space-x-8'>
              <NavLink targetId='home' isActive={activeSection === 'home'} href='/' text='HOME' onClick={() => smoothScrollTo('home')} />
              <NavLink targetId='projects' isActive={activeSection === 'projects'} href='/projects' text='PROJECTS' onClick={() => smoothScrollTo('projects')} />
              <NavLink targetId='contact' isActive={activeSection === 'contact'} href='/contact' text='CONTACT ME' onClick={() => smoothScrollTo('contact')} />
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className='md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 ease-in-out'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden absolute top-full right-4 transition-all duration-300 ease-in-out overflow-hidden bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-lg shadow-lg ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            style={{ width: '200px' }}
          >
            <nav className='py-2 space-y-2 cursor-pointer'>
              <MobileNavLink targetId='home' isActive={activeSection === 'home'} href='/' text='Home' onClick={() => smoothScrollTo('home')} />
              <MobileNavLink targetId='projects' isActive={activeSection === 'projects'} href='/projects' text='Projects' onClick={() => smoothScrollTo('projects')} />
              <MobileNavLink targetId='contact' isActive={activeSection === 'contact'} href='/contact' text='Contact Me' onClick={() => smoothScrollTo('contact')} />
            </nav>
          </div>
        </div>

      </header>
    </>

  )
}

function NavLink({ href, text, isActive, onClick }) {
  return (
    <button
      href={href}
      onClick={onClick}
      className={`relative group font-medium transition-colors duration-200 ease-in-out ${isActive ? 'text-purple-500' : 'text-gray-700 hover:text-gray-900'}`}
    >
      {text}
      <div className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
    </button>
  )
}

function MobileNavLink({ href, text, isActive, onClick }) {
  return (
    <button
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200 ease-in-out ${isActive ? 'text-purple-500' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
        }`}
    >
      {text}
    </button>
  )
}

export default Nav