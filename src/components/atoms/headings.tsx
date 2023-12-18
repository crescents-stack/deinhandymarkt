const H1 = ({ text = <>Heading 1</> }: { text: React.ReactNode }) => {
  return (
    <h1
      className="h1"
    >
      {text}
    </h1>
  );
};

export default H1;
