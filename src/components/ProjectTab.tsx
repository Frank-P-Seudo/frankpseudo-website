import { ProjectTabProps } from "../common/interfaces";
import ProjectBox from "./ProjectBox";

export default function ProjectTab({id, translator, projectColumn} : ProjectTabProps) {
    return (
        <div id={id} className="project-tab hide p-2 w-100 surrounded">
            <h4><b><i className={projectColumn.icon}></i>&nbsp;&nbsp;{translator.translate(projectColumn.title)}</b></h4>
            {projectColumn.description.map((desc, index) => {
                if (!desc) return;
                return (
                    <div key={index} className="text-justify px-3 mb-3">
                        {translator.translate(desc)}
                    </div>
                );
            })}                        
            {projectColumn.projects.map((p, index) => {
                return (
                    <div key={index}>
                        <ProjectBox project={p} translator={translator}/>
                    </div>
                );
            })}
        </div>
    );
}