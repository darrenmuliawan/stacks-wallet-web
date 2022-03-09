import { AssetWithMeta } from "@app/common/asset-types";
import { AssetItem } from "@app/components/asset-item";
import { useBitcoinTokenState } from "@app/store/assets/asset.hooks";
import { RouteUrls } from "@shared/route-urls";
import { Stack, StackProps } from "@stacks/ui";
import BigNumber from "bignumber.js";
import { forwardRef, Suspense, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const navigateToBuyBitcoinPage = useCallback(() => navigate(RouteUrls.BuyBitcoin), [navigate]);

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
      _hover={{ cursor: 'pointer' }}
      // onClick={navigateToBuyBitcoinPage}
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