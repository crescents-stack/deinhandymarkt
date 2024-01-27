import Result from "@/app/search/_utils/components/result";
import SearchHero from "@/app/search/_utils/components/searchhero";

const Search = ({ searchParams }: { searchParams: any }) => {
  return (
    <>
      <SearchHero searchParams={searchParams} />
      <Result searchParams={searchParams}/>
    </>
  );
};

export default Search;
