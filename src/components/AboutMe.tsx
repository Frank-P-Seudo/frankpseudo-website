import SectionHeader from "./SectionHeader";
import { ComponentProps} from "../common/interfaces"

export default function AboutMe({translator}: ComponentProps) {
    return (
        <section id="section-about" className="text-justify">
            <SectionHeader text={translator.translate("aboutMe")} />
            <div className="row">
                <div className="col-md-9">
                    <div>{translator.translate("aboutMe_para1a")}<b>{translator.translate("aboutMe_para1_keyword1")}</b>{translator.translate("aboutMe_para1b")}<span className="font-italic">{translator.translate("aboutMe_para1c")}</span></div>
                    <br/>
                    <div>{translator.translate("aboutMe_para2a")}<b>{translator.translate("aboutMe_para2_keyword1")}</b>{translator.translate("aboutMe_para2b")}<b>{translator.translate("aboutMe_para2_keyword2")}</b>{translator.translate("aboutMe_para2c")}<a href="https://www.youtube.com/@SuperSimpleDev" target="_blank">SuperSimpleDev</a>{translator.translate("aboutMe_para2d")}</div>
                    <br/>
                    <div>{translator.translate("aboutMe_para3a")}<b>{translator.translate("aboutMe_para3_keyword1")}</b>{translator.translate("aboutMe_para3b")}</div>
                    <br/>
                    <div className="font-italic">{translator.translate("aboutMe_para4a")}</div>                
                </div>
                <div className="col-md-3">
                    <div className="container m-3">
                        <a href="https://www.amazon.com/-/zh_TW/Frank-P-Seudo/dp/9887654809/ref=sr_1_1?crid=1XARUPGVJ6DF4&keywords=what+if...+flat+earthers+were+right&qid=1678432083&sprefix=what+if...+flat+earthers+were+rig%2Caps%2C321&sr=8-1" target="_blank">
                            <img className="mx-auto" style={{maxWidth:250}} src="/bookcover_front.png"/>
                        </a>    
                    </div>
                </div>
            </div>        
        </section>
    );
}