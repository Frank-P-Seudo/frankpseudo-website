import SectionHeader from "./SectionHeader";
import { ComponentProps } from "../common/interfaces"
import { SkillData } from "../data/SkillData";
import SkillRow from "./SkillRow";

export default function SkillTable({translator}: ComponentProps) {
    
    return (<section>
        <SectionHeader text={translator.translate("skills")}/>
        <div className="container px-1">
            <SkillRow row={SkillData}/>
            {/* <SkillRow row={SkillData.slice(6,12)}/> */}
        </div>
    </section>);
}