interface Props {
  letterClass: string;
  strArray: string[];
  index: number;
}

export const AnimatedLetters = ({ letterClass, strArray, index }: Props) => {
  return (
    <>
      {strArray.map((char, i) => (
        <h2
          key={char + i}
          style={{ display: "inline-block" }}
          className={`${letterClass} _${i + index}`}
        >
          {char}
        </h2>
      ))}
    </>
  );
};
