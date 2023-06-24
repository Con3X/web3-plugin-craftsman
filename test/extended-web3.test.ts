import './polyfills';

import { ExtendedWeb3 } from '../src/extended-web3';

import { ExtendedContract } from '../src';
import {
  testSuccessfulCompilation,
  testCompilationCauseError,
  testDeploymentAndCalls,
} from './extended-contract-helpers';

describe('ExtendedWeb3', () => {
  let web3: ExtendedWeb3;
  let ExtendedContractType: typeof ExtendedContract;
  let fromAccount: string;
  beforeAll(async () => {
    web3 = new ExtendedWeb3('http://localhost:8545');
    ExtendedContractType = web3.craftsman.ExtendedContract;

    const accounts = await web3.eth.getAccounts();
    fromAccount = accounts[0];
  });

  it('compile source code', async () => {
    await testSuccessfulCompilation(ExtendedContractType);
  });

  it('raise error while compiling an invalid code', async () => {
    await testCompilationCauseError(ExtendedContractType);
  });

  // This test case can be unskipped if there is a node running
  it.skip('deploy contract', async () => {
    await testDeploymentAndCalls(ExtendedContractType, fromAccount);
  });
});
