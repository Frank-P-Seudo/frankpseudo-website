import { LanguageOrder } from "../common/types";
import { ComponentProps } from "../common/interfaces";

export default function Navbar({translator}: ComponentProps) {   
    
    /**
     * Change the language
     * @param lang - Code of the language in use
     * @param order - First or secondary language to switch into
     * @returns 
     */
    function handleLangChange(lang: string, order: LanguageOrder) {
        collapseNavbarMenu();
        switch (lang) {
            case "zh":
                return order === "1st" ? translator.i18n.changeLanguage("en") : translator.i18n.changeLanguage("ja");
            case "ja":
                return order === "1st" ? translator.i18n.changeLanguage("en") : translator.i18n.changeLanguage("zh");
            case "en":
            default:
                return order === "1st" ? translator.i18n.changeLanguage("zh") : translator.i18n.changeLanguage("ja");
        }
    }
    
    /**
     * Collapse navbar menu
     */
    function collapseNavbarMenu() {
        const menu = document.getElementById("navbarSupportedContent");
        if (menu?.classList.contains("show")) {
            menu.classList.remove("show");
        }
    }
    /**
     * Responds to click on a navbar button
     * @param id - ID of the section to scroll into view
     */
    function handleNavbarButtonClick(id: string) {
        document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
        collapseNavbarMenu();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="/"><span className="felipa">&nbsp;&nbsp;F</span></a>            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <button onClick={() => handleNavbarButtonClick("section-home")}>{translator.translate("home")}</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => handleNavbarButtonClick("section-about")}>{translator.translate("aboutMe")}</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => handleNavbarButtonClick("section-portfolio")}>{translator.translate("projects")}</button>
                    </li>                    
                    <li className="nav-item">
                        <button onClick={() => handleLangChange(translator.i18n.language, "1st")}>{translator.translate("firstLang")}</button>
                    </li>
                    <li className="nav-item">
                        <button onClick={() => handleLangChange(translator.i18n.language, "2nd")}>{translator.translate("secondLang")}</button>
                    </li>
                    <li className="nav-item">
                        <a href="mailto:tl.frank.wong@gmail.com" target="_blank"><button><i className="fa fa-envelope"></i></button></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}