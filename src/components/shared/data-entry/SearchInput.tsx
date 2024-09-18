import "../../../styles/components/shared/data-entry/SearchInput.css";

const SearchInput = (props: {
  placeholder: string;
  list: Array<any> | null;
  setList: Function;
}) => {
  const filterList = (input: string) => {
    if (!props.list) return;

    const filteredItems = props?.list.filter((item: any) =>
      item.title.toLowerCase().includes(input)
    );

    props.setList(filteredItems);
  };

  return (
    <input
      type="search"
      placeholder={props.placeholder}
      className="search-bar"
      onChange={(e) => filterList(e.target.value.toLowerCase())}
      disabled={props.list?.length === 0}
    />
  );
};

export default SearchInput;
