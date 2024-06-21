import { Skill } from "../common/interfaces";

export default function SkillRow({row}: {row: Skill[]}) {
    return(
        <div className="row">
            {row.map((s, index) => {
                let classes = "py-2 mx-3 rounded text-center text-wrap";
                if (s.isFontWhite) classes += " text-white"

                return (
                <div style={{width: "40%", maxWidth: 140}} className="col-2-sm m-3" key={index}>
                    <img style={{width: "50%"}} className="mb-3 d-block mx-auto" src={s.image}></img>
                    <div className={classes} style={{backgroundColor: s.backgroundColor}}><b>{s.name}</b></div>
                </div>);
            })}
        </div>
    );
}