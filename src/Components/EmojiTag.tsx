import { FC, MouseEventHandler } from "react";

type EmojiTagProps = {
  emoji: string;
  count: number;
  checked: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

export const EmojiTag: FC<EmojiTagProps> = ({ emoji, count, checked, handleClick }) => {
  return (
    <button onClick={handleClick} className={checked ? "tag checked-tag" : "tag"}>
      {emoji} {count}
    </button>
  );
};
