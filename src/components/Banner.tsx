import "./some.css";

type BannerType = {
  title: string | undefined;
};
export const Banner = (props: BannerType) => {
  return (
    <div className="banner">
      <h1 className="text-center title text-white">{props.title}</h1>
    </div>
  );
};
