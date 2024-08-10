import { AttributionProps } from "../common/interfaces";

export default function Attribution({
  translator,
  text,
  link,
  image,
}: AttributionProps) {
  return (
    <div className="d-flex align-items-center mx-2">
      <div className="text-tea mr-1">
        <small>{translator.translate(text)}</small>
      </div>
      <div style={{ maxWidth: 30 }}>
        <a href={link}>
          <img className="w-100" src={image} />
        </a>
      </div>
    </div>
  );
}
