const Toggler = ({ text = "Same as billing address?" }: { text: string }) => {
  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="w-9 h-[15px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {text}
      </span>
    </label>
  );
};

export default Toggler;
