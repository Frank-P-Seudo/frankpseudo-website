import { ProjectButtonProps } from "../common/interfaces";

export default function ProjectButton({translator, link}: ProjectButtonProps) {
    return (
        <a className="btn btn-sm btn-secondary mr-3 mb-3" href={link.url} target="_blank"><i className={link.icon}></i>&nbsp;&nbsp;{translator.translate(link.displayText)}</a>
    );
}