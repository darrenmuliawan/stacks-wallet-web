import { NoData } from "./component/no-data";

export const DataList = () => {
  const data = [];
  const hasData = data.length > 0;

  if (!hasData) return <NoData />;

  return (
    <>
      
    </>
  )
}