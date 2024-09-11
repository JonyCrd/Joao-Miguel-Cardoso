import { BoxProps } from "../data";
import { usePrices, useWalletBalances } from "../Context";
import { useMemo } from "react";
import { WalletRow } from "./WalletRow";
import classes from "./WalletPage.module.css";

interface WalletBalance {
  currency: string;
  amount: number;
}
// Instead of defining the FormattedWalletBalance interface like this, we could just
// extend from WalletBalance and then add the formatted property.
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

//Here the BoxProps interface is not defined nor imported.
//Since we are not adding any new properties to the Props interface, we could just use the BoxProps interface.
//I'm going to assume the BoxProps interface is defined in another file caled data.ts and import it.
interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  //These are custom hooks that look like they are used to fetch data.
  //In this case they can be custom hooks exported from Context used to share data between components.
  //We need to import them.
  const balances = useWalletBalances();
  const prices = usePrices();

  //From what I have learned we should use an enum when using switch to avoid typos.
  enum Blockchain {
    Osmosis = "Osmosis",
    Ethereum = "Ethereum",
    Arbitrum = "Arbitrum",
    Zilliqa = "Zilliqa",
    Neo = "Neo",
  }

  //Since we comparing strings in each case of the switch, we know this function should receive a string.
  //So we can avoid using any for the parameters type.
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case Blockchain.Osmosis:
        return 100;
      case Blockchain.Ethereum:
        return 50;
      case Blockchain.Arbitrum:
        return 30;
      case Blockchain.Zilliqa:
        return 20;
      case Blockchain.Neo:
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        //the blockchain property does not existe in the walletBalance interface.
        //We should probably use the currency property wich I assume is the name of the blockchain currency.
        const balancePriority = getPriority(balance.currency);
        //Here lhsPriority is not defined. And I think what we want to use is the balancePriority.
        if (balancePriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        //Again, the blockchain property does not exist in the walletBalance interface.
        //I believe we should use the currency property.
        const leftPriority = getPriority(lhs.currency);
        const rightPriority = getPriority(rhs.currency);
        //Here we can just return the result of leftPriority minus rightPriority. If the result is a negative number we know the leftPriority is greater.
        return leftPriority - rightPriority;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      //The toFixed metoth should receive a number as parameter wich indicates the number of digits after the decimal point we want.
      formatted: balance.amount.toFixed(3),
    };
  });

  //The sortedBalances is not of type FormattedWalletBalance.
  //I believe we should use tje formattedBalances variable intead.
  //The WalletRow component is not imported. We shouls import it.
  //Also we should import the css modules since we are passing it to the WalletRow component.
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
