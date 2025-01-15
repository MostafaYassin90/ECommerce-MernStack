import "./Title.css";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-xl text-gray-500">{text1} <span className="font-bold text-gray-900">{text2}</span></p>
      <p className="m-0 w-8 sm:w-16 h-[1px] sm:h-[2px] bg-gray-900"></p>
    </div>
  );
};

export default Title;
