import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import Home from "./components/Home";
import ProjectMenu from "./components/ProjectMenu";
import SkillTable from "./components/SkillTable";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";
import { Translator } from "./common/types";

export default function App() {
    const [ translate, i18n ] = useTranslation();    
    let translator: Translator = { translate: translate, i18n: i18n };
    return (
        <main className="container px-0 mx-2">
            <Navbar  translator={translator} />
            <div className="under-navbar">
                <Home translator={translator} />
                <ProjectMenu translator={translator} />
                <AboutMe translator={translator} />
                <SkillTable translator={translator} />
                <Footer translator={translator} />
            </div>
        </main>
);
}