interface Props {
  text: string;
  link: string;
}

export default function YearsLabel(props: Props) {
  return (
    <div className="">
      <a
        className="text-lg flex rounded justify-center group relative  overflow-hidden border w-full border-[#80CF76] px-8 py-3 focus:outline-none focus:ring"
        href={props.link}
      >
        <span className= "absolute inset-x-0 top-0 h-[2px] w-full bg-[#80CF76] transition-all group-hover:h-full group-active:bg-[#80CF76]"></span>

        <span className="text-lg relative font-medium text-[#80CF76] transition-colors group-hover:text-white">
          {props.text}
        </span>
      </a>
    </div>
  );
}
