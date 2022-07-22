import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
// @ts-ignore-next-line
import { OPTIMISM_KOVAN_RPC } from 'react-native-dotenv';
import { MMKV } from 'react-native-mmkv';
import { EthereumAddress } from '@/entities';
import { getProviderForNetwork } from '@/handlers/web3';
import { Network } from '@/helpers';
import { Navigation } from '@/navigation';
import { opWrapABI } from '@/references';
import { logger } from '@/utils';
import Routes from '@rainbow-me/routes';

const OP_WRAPPER_ADDRESS = {
  'op-kovan': '0x715da5e53526bedac9bd96e8fdb7efb185d1b6ca',
  'op-mainnet': '0x96a4f2d63b30c78e27025c2a4e4d3c049d02bdcb',
};

const CURRENT_NETWORK = 'op-kovan';

export const UNLOCK_KEY_OPTIMISM_NFT_APP_ICON = 'optimism_nft_app_icon';

// This is a temp fix while we still use kovan optimism for testing.
// Will be removed before release

const getKovanOpProvider = async () => {
  if (OPTIMISM_KOVAN_RPC) {
    const provider = new StaticJsonRpcProvider(OPTIMISM_KOVAN_RPC, 69);
    await provider.ready;
    return provider;
  }
  return null;
};

export const optimismNftAppIconCheck = async (
  featureCheckName: string,
  walletsToCheck: EthereumAddress[]
) => {
  const p =
    // @ts-ignore-next-line
    CURRENT_NETWORK === 'op-mainnet'
      ? await getProviderForNetwork(Network.optimism)
      : await getKovanOpProvider();

  if (!p) return false;

  const opWrapperInstance = new Contract(
    OP_WRAPPER_ADDRESS[CURRENT_NETWORK],
    opWrapABI,
    p
  );

  try {
    const found = await opWrapperInstance.areOwners(walletsToCheck);

    if (found) {
      Navigation.handleAction(Routes.EXPLAIN_SHEET, {
        onClose: () => {
          const mmkv = new MMKV();
          mmkv.set(featureCheckName, true);
          logger.log(
            'Feature check',
            featureCheckName,
            'set to true. Wont show up anymore!'
          );
        },
        type: 'optimism_app_icon',
      });
      return true;
    }
  } catch (e) {
    logger.log('areOwners blew up', e);
  }
  return false;
};