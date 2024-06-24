import { Project, ProjectColumn } from "../common/interfaces";

const dotnetProjects: Project[] = [
    {
        image: "./project_pic_socialmediamarketer.png",
        title: "project_title_socialmediamarketer",
        description: ["project_desc_socialmediamarketer_1", "project_desc_socialmediamarketer_2", "project_desc_socialmediamarketer_3"],
        tech: ["C#", ".NET", "TypeScript", "jQuery", "MySQL"],
        siteUrl: {icon:"fa-solid fa-door-open", displayText: "project_site_displayText_corprio", url: "https://shopify.corprio.com/"}
    }, {
        image: "./project_pic_salesassistant.png",
        title: "project_title_salesassistant",
        description: ["project_desc_salesassistant_1", "project_desc_salesassistant_2", "project_desc_salesassistant_3"],
        tech: ["C#", ".NET", "TypeScript", "jQuery", "MySQL"],
        siteUrl: {icon:"fa-solid fa-door-open", displayText: "project_site_displayText_corprio", url: "https://salesassistant.corprio.com/"}
    }, {
        image: "./project_pic_shopify.png",
        title: "project_title_shopify",
        description: ["project_desc_shopify_1", "project_desc_shopify_2", "project_desc_shopify_3"],
        tech: ["C#", ".NET", "TypeScript", "jQuery", "MySQL", "GraphQL"],
        siteUrl: {icon:"fa-solid fa-door-open", displayText: "project_site_displayText_corprio", url: "https://socialmediamarketer.corprio.com/"}
    }
];

const gameProjects: Project[] = [
    {
        image: "./project_pic_moz.png",
        title: "project_title_moz",
        description: ["project_desc_moz_1", "project_desc_moz_2", "project_desc_moz_3"],
        tech: ["HTML", "CSS", "JavaScript"],
        demoUrl: {icon:"fa-solid fa-video", displayText: "project_demo_displayText", url: "https://youtu.be/Qy22gjbEqic"},
        repoUrl: {icon:"fa-brands fa-github", displayText: "project_repo_displayText", url: "https://github.com/Frank-P-Seudo/frankpseudo-website/tree/main/MOZ"},
        siteUrl: {icon:"fa-solid fa-door-open", displayText: "project_site_displayText_moz", url: "./MOZ/Deckbuilder.html"}
    }
];

const schoolProjects: Project[] = [
    {
        image: "./project_pic_mangafreaker.png",
        title: "project_title_mangafreaker",
        description: ["project_desc_mangafreaker1", "project_desc_mangafreaker2"],
        tech: ["Node.js", "Express.js", "MongoDB"],
        demoUrl: {icon:"fa-solid fa-video", displayText: "project_demo_displayText", url: "https://youtu.be/k9oUnUK6DyQ"},
    }, {
        image: "./project_pic_cs50_commerce.png",
        title: "project_title_cs50_commerce",
        description: ["project_desc_cs50_commerce"],
        tech: ["Python", "Django", "JavaScript", "SQLite"],
        repoUrl: {icon:"fa-brands fa-github", displayText: "project_repo_displayText", url: "https://github.com/Frank-P-Seudo/portfolio/tree/master/commerce"},
        demoUrl: {icon:"fa-solid fa-video", displayText: "project_demo_displayText", url: "https://www.youtube.com/watch?v=-JkP87fPwO4"},
    }, {
        image: "./project_pic_cs50_rainmaker.png",
        title: "project_title_cs50_rainmaker",
        description: ["project_desc_cs50_rainmaker"],
        tech: ["Python", "Django", "JavaScript", "SQLite"],
        repoUrl: {icon:"fa-brands fa-github", displayText: "project_repo_displayText", url: "https://github.com/Frank-P-Seudo/portfolio/tree/master/rainmaker"},
        demoUrl: {icon:"fa-solid fa-video", displayText: "project_demo_displayText", url: "https://www.youtube.com/watch?v=pyTOten6tMI"},
    }, {
        image: "./project_pic_cs50_network.png",
        title: "project_title_cs50_network",
        description: ["project_desc_cs50_network"],
        tech: ["Python", "Django", "JavaScript", "SQLite"],
        repoUrl: {icon:"fa-brands fa-github", displayText: "project_repo_displayText", url: "https://github.com/Frank-P-Seudo/portfolio/tree/master/network"},
        demoUrl: {icon:"fa-solid fa-video", displayText: "project_demo_displayText", url: "https://www.youtube.com/watch?v=W4Xka7liMcg"},
    }, 
];

export const ProjectData: ProjectColumn[] = [
    {
        title: "tab_title_dotnet",
        icon: "devicon-dot-net-plain",
        description: ["tab_desc_dotnet1", "tab_desc_dotnet2"],
        projects: dotnetProjects,
    }, {
        title: "tab_title_game",
        icon: "fa-solid fa-gamepad",
        description: ["tab_desc_game"],
        projects: gameProjects,
    }, {
        title: "tab_title_school",
        icon: "fa-solid fa-school",
        description: ["tab_desc_school"],
        projects: schoolProjects,
    }
];