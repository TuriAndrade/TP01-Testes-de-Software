export default function StickerSelect({ number, selected, inactive, ...rest }) {
  return (
    <div
      {...rest}
      className={
        selected
          ? "stickerSelect stickerSelect--active"
          : inactive
          ? "stickerSelect uDisabledBtn"
          : "stickerSelect"
      }
    >
      {number}
    </div>
  );
}
