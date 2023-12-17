const H1 = ({ text = <>Heading 1</> }: { text: React.ReactNode }) => {
  return (
    <h1
      className={`text-[32px] md:text-[38px] lg:text-[48px] text-left font-light text-gray-500 [&>span]:font-bold [&>span]:text-secondary`}
    >
      {text}
    </h1>
  );
};

export default H1;
