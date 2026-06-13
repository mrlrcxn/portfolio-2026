import { useNavigate } from 'react-router-dom'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  variant?: 'featured' | 'compact'
  index?: number
}

const ProjectCard = ({ project, variant = 'featured', index = 0 }: ProjectCardProps) => {
  const navigate   = useNavigate()
  const isCompact  = variant === 'compact'
  const wip        = project.wip === true
  const isPrivate  = project.isPrivate === true
  const isClickable = !wip

  const chip = wip ? 'Work in Progress' : isPrivate ? 'Private' : null

  const go = () => {
    navigate(`/work/${project.slug}`)
    window.scrollTo(0, 0)
  }

  const handleClick = () => { if (isClickable) go() }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isClickable) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go() }
  }

  return (
    <article
      className={`${isCompact ? '' : 'reveal relative z-50'} flex flex-col ${isClickable ? 'group cursor-pointer' : 'cursor-default'}`}
      style={!isCompact ? { transitionDelay: `${index * 0.12}s` } : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View case study: ${project.title}` : undefined}
    >
      <div
        className={`
          flex flex-col flex-1 bg-surface border border-border overflow-hidden
          transition-[border-color,transform,box-shadow] duration-200 outline-none
          ${isCompact ? 'rounded-avatar' : 'rounded-card shadow-card'}
          ${!isClickable
            ? 'opacity-[0.72]'
            : isCompact
              ? 'group-hover:border-accent group-hover:-translate-y-[3px] group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2'
              : 'group-hover:border-accent group-hover:-translate-y-1 group-hover:shadow-card-hover group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2'
          }
        `}
      >
        {/* Cover image */}
        <div
          className={`shrink-0 overflow-hidden flex items-center justify-center relative ${isCompact ? 'h-40' : 'h-[260px]'}`}
          style={{ background: project.coverBg ?? 'var(--color-accent-soft)' }}
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className={`w-full h-full object-cover object-top block ${
                isCompact
                  ? ''
                  : 'scale-[1.06] origin-top group-hover:scale-100 transition-transform duration-500'
              }`}
            />
          ) : (
            <span className="text-sm font-semibold tracking-tag uppercase text-accent opacity-50">
              Preview
            </span>
          )}

          {/* Status chip — WIP or Private */}
          {chip && (
            <span className="absolute top-4 left-4 bg-[rgba(18,16,28,0.85)] backdrop-blur-sm border border-white/10 rounded-pill px-3 py-1 font-ui text-[12px] font-semibold tracking-tag uppercase text-white/60">
              {chip}
            </span>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${isCompact ? 'px-6 pt-5 pb-6' : 'px-7 pt-6 pb-7'}`}>

          {isCompact && (
            <p className="font-mono text-[12px] font-bold uppercase text-default-subtle mb-1.5">
              {project.category}
            </p>
          )}

          <h3 className={`font-bold text-default-accent mb-[10px] line-clamp-2 ${
            isCompact
              ? 'font-ui text-h4 tracking-snug leading-tight'
              : 'text-h3 tracking-tight'
          }`}>
            {project.title}
          </h3>

          <p className={`text-default-subtle line-clamp-4 ${
            isCompact ? 'text-sm leading-[1.6]' : 'text-md leading-[1.65] mb-6'
          }`}>
            {project.description}
          </p>

          {/* CTA — featured only, non-WIP only */}
          {!isCompact && !wip && (
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 font-ui text-md font-semibold text-default-accent transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent">
                View Case Study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
