import { ComponentProps } from "../common/interfaces";
import Attribution from "./Attribution";

export default function Footer({ translator }: ComponentProps) {
  return (
    <div className="fix-bottom pb-3 d-flex justify-content-around align-items-center">
      <Attribution
        translator={translator}
        text={"footerText_favicon"}
        link={"https://www.textstudio.com/"}
        image={"https://cdn.textstudio.com/asset/favicon.svg"}
      />
      <Attribution
        translator={translator}
        text={"footerText_react"}
        link={"https://react.dev/"}
        image={
          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
        }
      />
    </div>
  );
}
