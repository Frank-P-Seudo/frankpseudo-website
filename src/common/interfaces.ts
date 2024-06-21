import { Translator } from "./types";

export interface ComponentProps {
    translator: Translator
}

export interface SectionHeaderProps extends ComponentProps {
    text: string,    
}

export interface Skill {
    image: string,
    name: string,
    isFontWhite: boolean,
    backgroundColor: string,
}

export interface Project {
    image: string,
    title: string,
    tech: string[],
    description: string[],
    repoUrl?: ExternalLink,
    demoUrl?: ExternalLink,
    siteUrl?: ExternalLink,
}

export interface ProjectColumn {
    title: string,
    icon: string,
    description: string[],
    projects: Project[],
}

export interface ProjectTabProps extends ComponentProps {
    id: string,
    projectColumn: ProjectColumn,    
}

export interface ProjectBoxProps extends ComponentProps {
    project: Project,    
}

export interface ExternalLink {    
    displayText: string,
    icon: string,
    url: string,
}

export interface ProjectButtonProps extends ComponentProps {
    link: ExternalLink,
}