import { projects } from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from './ProjectCard'

export const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="reveal flex items-center gap-3 mb-10">
    <div className="w-7 h-px bg-accent" />
    <span className="text-sm font-semibold tracking-tag uppercase text-accent">
      {label}
    </span>
  </div>
)

const Projects = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="work">
      <div ref={sectionRef}>
        <div className="reveal mb-8" style={{ transitionDelay: '0s' }}>
          <h2 className="section-title">
            <span className="text-accent">[</span> Selected Work <span className="text-accent">]</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} variant="featured" index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
