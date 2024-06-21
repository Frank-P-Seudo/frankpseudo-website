import SectionHeader from "./SectionHeader";
import { ComponentProps} from "../common/interfaces"
import { ProjectData } from "../data/ProjectData";
import ProjectTab from "./ProjectTab";
import { useState } from "react";
import React from "react";

export default function ProjectMenu({translator}: ComponentProps) {
    const [tabIndex, setTabIndex] = useState(0);
    
    React.useEffect(() => {
        /** Control which tab button has 'current' class */
        const navLinks = Array.from(document.querySelectorAll('#section-portfolio .nav-link'));
        navLinks.forEach(n => n.classList.remove("current"));

        const button = document.getElementById(`nav-link-${tabIndex}`);        
        if (button) button.classList.add("current");
        
        /** Control which tab is shown */
        const tabs = Array.from(document.querySelectorAll('.project-tab'));
        tabs.forEach(t => t.classList.add("hide"));

        const tab = document.querySelector(`#tab-${tabIndex}`);
        if (tab) tab.classList.remove("hide");

    }, [tabIndex]);
    
    return (
        <section id="section-portfolio">
            <SectionHeader text={translator.translate("portfolio")} />
            <div className="">
                <ul className="nav nav-tabs justify-content-center">
                    {ProjectData.map((tab, index) => {
                        let classes = "nav-link text-tea ";                    
                        if (index === 0) classes += "current";

                        return (
                            <li key={index} className="nav-item">
                                <button id={`nav-link-${index}`} className={classes} onClick={() => setTabIndex(index)} >{translator.translate(tab.title)}</button>
                            </li>
                        );
                    })}                                
                </ul>

                {ProjectData.map((tab, index) => {
                    return (<ProjectTab 
                        key={index}
                        translator={translator}
                        id={"tab-"+index} 
                        projectColumn={tab}                        
                        />);
                })} 
            </div>
        </section>
    );
}