import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Filter, Eye, ExternalLink, Code2 } from "lucide-react"

const ProjectCard = ({project, handleSelectTag}) => {
    return (
        <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Background Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Action buttons at top right */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                            <Code2 size={16} />
                        </Link>
                    )}
                    {project.live && (
                        <Link
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                            <ExternalLink size={16} />
                        </Link>
                    )}
                    {project.demo && (
                        <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                            <Eye size={16} />
                        </Link>
                    )}
                </div>
            </div>
            
            {/* Minimal text section at bottom */}
            <div className="p-4">
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                </div>
                
                <div className="mb-3">
                    <p className="text-sm text-gray-300">{project.description}</p>
                </div>
                
                
                <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectTag(tech)}
                            className="px-2 py-0.5 text-xs bg-white/20 text-white rounded cursor-pointer hover:bg-white/30 transition-colors"
                        >
                            {tech}
                        </button>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-xs bg-white/10 text-white rounded">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;