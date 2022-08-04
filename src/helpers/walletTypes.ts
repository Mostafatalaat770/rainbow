export enum EthereumWalletType {
  mnemonic = 'mnemonic',
  privateKey = 'privateKey',
  readOnly = 'readOnly',
  seed = 'seed',
  bluetoothHardware = 'bluetoothHardware',
}

// We need to keep this one until
// we have typescript everywhere
export default {
  bluetoothHardware: 'bluetoothHardware' as EthereumWalletType,
  mnemonic: 'mnemonic' as EthereumWalletType,
  privateKey: 'privateKey' as EthereumWalletType,
  readOnly: 'readOnly' as EthereumWalletType,
  seed: 'seed' as EthereumWalletType,
};
