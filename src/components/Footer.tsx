import { ComponentProps } from "../common/interfaces"

export default function Footer({translator}: ComponentProps) {
    return (<div className="fix-bottom pb-3 d-flex justify-content-end align-items-center">        
        <div className="text-tea">{translator.translate("footerText")}&nbsp;&nbsp;</div>
        <div style={{maxWidth: 30}}>
            <img className="w-100" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"/>
        </div>        
    </div>);
}