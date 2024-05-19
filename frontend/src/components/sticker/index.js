import { Times } from "../../icons";
export default function Sticker({ number, deleteFunction, ...rest }) {
  return (
    <div {...rest} className="sticker">
      <div onClick={deleteFunction} className="sticker__removeBox">
        <Times />
      </div>
      <div className="sticker__number">{number}</div>
    </div>
  );
}
