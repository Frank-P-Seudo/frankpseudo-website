import { ProjectBoxProps } from "../common/interfaces"
import ProjectButton from "./ProjectButton";

export default function ProjectBox({project, translator}: ProjectBoxProps) {
    return (
        <div className="row my-3">
            <div className="col-md-6">
                <div className="container m-3 p-0">
                    <h5>{translator.translate(project.title)}</h5>
                    <img className="rounded" style={{width:"90%"}} src={project.image}/>    
                </div>
            </div>
            
            <div className="col-md-6">
                <div className="my-3"><i className="fa-solid fa-circle"></i>&nbsp;&nbsp;{project.tech.join(" / ")}</div>
                {project.description.map((desc, index) => {
                    if (!desc) return;
                    return (
                    <div className="mb-3 text-justify" key={index}>{translator.translate(desc)}</div>);
                })}                
                {project.demoUrl && <ProjectButton translator={translator} link={project.demoUrl}/>}
                {project.repoUrl && <ProjectButton translator={translator} link={project.repoUrl}/>}
                {project.siteUrl && <ProjectButton translator={translator} link={project.siteUrl}/>}
            </div>            
        </div> 
    );
}