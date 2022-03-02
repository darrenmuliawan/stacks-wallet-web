import { AssetRow } from "@app/components/asset-row";
import { useDataTokenState } from "@app/store/data/data.hooks";
import { Stack, StackProps } from "@stacks/ui";
import { Suspense } from "react";
import { NoData } from "./component/no-data";

interface DataListProps extends StackProps {
  address: string;
}

const DataRow = ({ asset }: any) => {
  return <AssetRow asset={asset} />;
}

export const DataList = ({ address, ...props }: DataListProps) => {
  const data = useDataTokenState(address);
  const personalInformation = data.personalInformation;
  const interests = data.interests;
  const purchaseHistory = data.purchaseHistory;
  const demographics = data.demographics;

  const hasData = personalInformation.balance.toNumber() > 0 || interests.balance.toNumber() > 0 || purchaseHistory.balance.toNumber() > 0 || demographics.balance.toNumber() > 0;

  if (!hasData) return <NoData />;

  return (
    <Stack pb="extra-loose" spacing="extra-loose" {...props}>
      {
        Object.values(data).map(asset => (
          <Suspense fallback={<AssetRow asset={asset}/>} key={asset.name}>
            <DataRow asset={asset} />
          </Suspense>
        ))
      }
    </Stack>
  )
}