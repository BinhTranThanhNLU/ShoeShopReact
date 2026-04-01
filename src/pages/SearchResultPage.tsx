import SearchProductList from "../components/SearchResultComponent/SearchProductList";
import SearchResultHeader from "../components/SearchResultComponent/SearchResultHeader";
import Pagination from "../components/utils/Pagination";

const SearchResultPage = () => {
  return (
    <main className="main">
      <SearchResultHeader />
      <SearchProductList />
      <Pagination />
    </main>
  );
};

export default SearchResultPage;
