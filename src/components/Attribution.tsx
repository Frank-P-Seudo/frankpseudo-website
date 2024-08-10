import { AttributionProps } from "../common/interfaces";

export default function Attribution({
  translator,
  text,
  link,
  image,
}: AttributionProps) {
  return (
    <div className="d-flex align-items-center">
      <div className="text-tea">{translator.translate(text)}&nbsp;&nbsp;</div>
      <div style={{ maxWidth: 30 }}>
        <a href={link}>
          <img className="w-100" src={image} />
        </a>
      </div>
    </div>
  );
}
