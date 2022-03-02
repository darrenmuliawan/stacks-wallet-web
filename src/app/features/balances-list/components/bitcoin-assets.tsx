import { AssetWithMeta } from "@app/common/asset-types";
import { AssetItem } from "@app/components/asset-item";
import { AssetRow } from "@app/components/asset-row";
import { StxIcon } from "@app/components/icons/stx-icon";
import { useBitcoinTokenState } from "@app/store/assets/asset.hooks";
import { Circle, color, Stack, StackProps } from "@stacks/ui";
import BigNumber from "bignumber.js";
import { forwardRef, Suspense } from "react";

interface AssetRowProps extends StackProps {
  asset: AssetWithMeta;
}

const BitcoinRow = forwardRef<HTMLDivElement, AssetRowProps>((props, ref) => {
  const { asset, ...rest } = props;
  const { name, contractAddress, contractName, type, meta, subtitle, balance, subBalance } = asset;
  const valueFromBalance = (balance: BigNumber) => balance.toString();
  const amount = valueFromBalance(balance);
  const subAmount = subBalance && valueFromBalance(subBalance);
  const isDifferent = subBalance && !balance.isEqualTo(subBalance);

  return (
    <AssetItem
      ref={ref}
      avatar={'btc'}
      title={name}
      caption={subtitle}
      amount={amount}
      subAmount={subAmount}
      isDifferent={isDifferent}
      name={name}
      data-testid={`asset-${name}`}
      {...rest}
    />
  )
})

export const BitcoinAssets = (props: StackProps) => {
  const bitcoinAssets = useBitcoinTokenState();

  return (
    <Stack spacing="loose" {...props}>
      <Suspense fallback={<BitcoinRow asset={bitcoinAssets}/>}>
        <BitcoinRow asset={bitcoinAssets}/>
      </Suspense>
    </Stack>
  )
}