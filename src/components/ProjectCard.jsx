import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Filter, Eye, ExternalLink, Code2 } from "lucide-react"

const ProjectCard = ({project, handleSelectTag}) => {
    return (
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Background Image */}
            <div className="relative w-full h-70">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            
            {/* Action buttons - positioned at top right over image */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {project.github && (
                    <Link 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                    >
                        <Code2 size={16} className="text-white" />
                    </Link>
                )}
                {project.live && (
                    <Link 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                    >
                        <ExternalLink size={16} className="text-white" />
                    </Link>
                )}
                {project.demo && (
                    <Link 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors"
                    >
                        <Eye size={16} className="text-white" />
                    </Link>
                )}
            </div>

            {/* Minimal text section at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm p-3">
                <h3 className="text-base font-semibold text-white mb-1">
                    {project.title}
                </h3>
                
                <p className="text-gray-300 text-xs mb-2 line-clamp-1">
                    {project.description}
                </p>
                
                {/* Compact technology tags */}
                <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            onClick={() => handleSelectTag(tech)}
                            className="px-2 py-0.5 text-xs bg-white/20 text-white rounded cursor-pointer hover:bg-white/30 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-xs bg-white/10 text-gray-300 rounded">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;