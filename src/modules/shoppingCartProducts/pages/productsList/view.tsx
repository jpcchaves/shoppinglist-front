import { useAppSelector } from "../../../../hooks/useRedux";

const ProductsListView = () => {
  const { productList } = useAppSelector((state) => state.product);

  return (
    <div>
      {(productList || []).map(({ id, name, urgencyLevel }) => (
        <p key={id}>
          {name} {urgencyLevel}
        </p>
      ))}
    </div>
  );
};

export default ProductsListView;
