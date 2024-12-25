import {
  StoreWithCache,
  TypeormDatabaseWithCache,
} from "@belopash/typeorm-store";
import { Log } from "@subsquid/evm-processor";
import * as bgtAbi from "./abi/BGT";
import * as erc20Abi from "./abi/ERC20";
import * as lockerFactoryAbi from "./abi/LockerFactory";
import * as honeyLockerAbi from "./abi/HoneyLocker";
import * as xkdkAbi from "./abi/XKDK";
import {
  Locker,
  LockerBalance,
  LockerDeposit,
  LockerWithdrawal,
  LockerTotalDeposit,
  LockerStake,
  LockerUnstake,
  LockerTotalStake,
  LockerRewardsClaim,
  LockerWildcard,
  AdapterUpgraded,
  AdapterRegistered,
  XKDKFinalizedRedeem,
  XKDKRedeem,
  BGTDelegation,
  Adapter,
} from "./model";
import { processor, ProcessorContext } from "./processor";

type Task = () => Promise<void>;
type MappingContext = ProcessorContext<StoreWithCache> & { queue: Task[] };

processor.run(new TypeormDatabaseWithCache(), async (ctx) => {
  const mctx: MappingContext = {
    ...ctx,
    queue: [],
  };

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      await processLog(log, block, mctx);
    }
  }

  for (let task of mctx.queue) {
    await task();
  }
});

async function processLog(log: Log, block: any, mctx: MappingContext) {
  if (lockerFactoryAbi.events.LockerFactory__NewLocker.is(log)) {
    processNewVault(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__Deposited.is(log)) {
    await processDeposit(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__Withdrawn.is(log)) {
    await processWithdrawal(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__LockedUntil.is(log)) {
    await processLock(log, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__Staked.is(log)) {
    await processStake(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__Unstaked.is(log)) {
    await processUnstake(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__Claimed.is(log)) {
    await processRewardsClaim(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__Wildcard.is(log)) {
    await processWildcard(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__OperatorSet.is(log)) {
    await processOperatorSet(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__TreasurySet.is(log)) {
    await processTreasurySet(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__AdapterRegistered.is(log)) {
    await processAdapterRegistered(log, block, mctx);
  } else if (honeyLockerAbi.events.HoneyLocker__AdapterUpgraded.is(log)) {
    await processAdapterUpgraded(log, block, mctx);
  } else if (bgtAbi.events.QueueBoost.is(log)) {
    await processBGTQueueBoost(log, mctx);
  } else if (bgtAbi.events.ActivateBoost.is(log)) {
    await processBGTActivateBoost(log, mctx);
  } else if (bgtAbi.events.CancelBoost.is(log)) {
    await processBGTCancelBoost(log, mctx);
  } else if (bgtAbi.events.DropBoost.is(log)) {
    await processBGTDropBoost(log, mctx);
  } else if (xkdkAbi.events.Redeem.is(log)) {
    await processXKDKRedeem(log, block, mctx);
  } else if (xkdkAbi.events.FinalizeRedeem.is(log)) {
    await processXKDKFinalizedRedeem(log, block, mctx);
  } else if (erc20Abi.events.Transfer.is(log)) {
    await processERC20Transfer(log, block, mctx);
  } else if (honeyLockerAbi.events.OwnershipTransferred.is(log)) {
    await processOwnershipTransferred(log, mctx);
  }
}

function processNewVault(log: Log, block: any, mctx: MappingContext) {
  const {
    owner,
    locker: lockerAddress,
    unlocked,
    referrer,
  } = lockerFactoryAbi.events.LockerFactory__NewLocker.decode(log);
  const locker = mctx.store.defer(Locker, lockerAddress.toLowerCase());
  mctx.queue.push(async () => {
    locker.getOrInsert(
      () =>
        new Locker({
          id: lockerAddress.toLowerCase(),
          owner: owner.toLowerCase(),
          timestamp: BigInt(block.header.timestamp),
          address: lockerAddress.toLowerCase(),
          unlocked,
          referrer: referrer.toLowerCase(),
        })
    );
  });
}

async function processDeposit(log: Log, block: any, mctx: MappingContext) {
  const { LPToken, amountOrId } =
    honeyLockerAbi.events.HoneyLocker__Deposited.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new LockerDeposit({
        id: log.id,
        locker: log.address.toLowerCase(),
        token: LPToken.toLowerCase(),
        amountOrId: amountOrId,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
  await updateLockerTotalDeposit(log.address, LPToken, amountOrId, mctx);
}

async function processWithdrawal(log: Log, block: any, mctx: MappingContext) {
  const { LPToken, amountOrId } =
    honeyLockerAbi.events.HoneyLocker__Withdrawn.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new LockerWithdrawal({
        id: log.id,
        locker: log.address.toLowerCase(),
        token: LPToken.toLowerCase(),
        amountOrId: amountOrId,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
  await updateLockerTotalDeposit(log.address, LPToken, -amountOrId, mctx);
}

async function processLock(log: Log, mctx: MappingContext) {
  const { LPToken, expiration } =
    honeyLockerAbi.events.HoneyLocker__LockedUntil.decode(log);
  const id = log.address + "-" + LPToken;
  mctx.store.defer(LockerTotalDeposit, id);
  mctx.queue.push(async () => {
    const existingDeposit = await mctx.store.get(LockerTotalDeposit, id);
    await mctx.store.upsert(
      new LockerTotalDeposit({
        ...existingDeposit,
        id: id,
        lockExpiration: expiration,
      })
    );
  });
}

async function processStake(log: Log, block: any, mctx: MappingContext) {
  const { vault, LPToken, amountOrId } =
    honeyLockerAbi.events.HoneyLocker__Staked.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new LockerStake({
        id: log.id,
        locker: log.address.toLowerCase(),
        token: LPToken.toLowerCase(),
        vault: vault.toLowerCase(),
        amountOrId: amountOrId,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
  await updateVaultTotalStake(log.address, LPToken, vault, amountOrId, mctx);
}

async function processUnstake(log: Log, block: any, mctx: MappingContext) {
  const { vault, LPToken, amountOrId } =
    honeyLockerAbi.events.HoneyLocker__Unstaked.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new LockerUnstake({
        id: log.id,
        locker: log.address.toLowerCase(),
        token: LPToken.toLowerCase(),
        vault: vault.toLowerCase(),
        amountOrId: amountOrId,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
  await updateVaultTotalStake(
    log.address.toLowerCase(),
    LPToken.toLowerCase(),
    vault.toLowerCase(),
    -amountOrId,
    mctx
  );
}

async function processRewardsClaim(log: Log, block: any, mctx: MappingContext) {
  const { vault, rewardToken, amount } =
    honeyLockerAbi.events.HoneyLocker__Claimed.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new LockerRewardsClaim({
        id: log.id,
        locker: log.address.toLowerCase(),
        vault: vault.toLowerCase(),
        token: rewardToken.toLowerCase(),
        amount: amount,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
}

async function processWildcard(log: Log, block: any, mctx: MappingContext) {
  const { vault, func, args } =
    honeyLockerAbi.events.HoneyLocker__Wildcard.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new LockerWildcard({
        id: log.id,
        locker: log.address.toLowerCase(),
        vault: vault.toLowerCase(),
        func: func,
        args: args,
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
}

function processOperatorSet(log: Log, block: any, mctx: MappingContext) {
  const { operator } =
    honeyLockerAbi.events.HoneyLocker__OperatorSet.decode(log);
  const locker = mctx.store.defer(Locker, log.address.toLowerCase());
  mctx.queue.push(async () => {
    const locker = await mctx.store.get(Locker, log.address.toLowerCase());
    if (locker) {
      await mctx.store.upsert(
        new Locker({ ...locker, operator: operator.toLowerCase() })
      );
    }
  });
}

function processTreasurySet(log: Log, block: any, mctx: MappingContext) {
  const { treasury } =
    honeyLockerAbi.events.HoneyLocker__TreasurySet.decode(log);
  const locker = mctx.store.defer(Locker, log.address.toLowerCase());
  mctx.queue.push(async () => {
    const locker = await mctx.store.get(Locker, log.address.toLowerCase());
    if (locker) {
      await mctx.store.upsert(
        new Locker({ ...locker, treasury: treasury.toLowerCase() })
      );
    }
  });
}

async function processAdapterRegistered(log: Log, block: any, mctx: MappingContext) {
  const { protocol, adapter } =
    honeyLockerAbi.events.HoneyLocker__AdapterRegistered.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new AdapterRegistered({
        id: log.id,
        locker: log.address.toLowerCase(),
        protocol: protocol.toLowerCase(),
        adapter: adapter.toLowerCase(),
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
    
    // Also create/update the Adapter entity for lookups
    await mctx.store.upsert(
      new Adapter({
        id: adapter.toLowerCase(),
        address: adapter.toLowerCase(),
        protocol: protocol.toLowerCase(),
        locker: log.address.toLowerCase(),
      })
    );
  });
}

async function processAdapterUpgraded(log: Log, block: any, mctx: MappingContext) {
  const { protocol, newImplementation } =
    honeyLockerAbi.events.HoneyLocker__AdapterUpgraded.decode(log);
  mctx.queue.push(async () => {
    await mctx.store.upsert(
      new AdapterUpgraded({
        id: log.id,
        locker: log.address.toLowerCase(),
        protocol: protocol.toLowerCase(),
        newImplementation: newImplementation.toLowerCase(),
        timestamp: BigInt(block.header.timestamp),
        transactionHash: log.transaction?.hash,
      })
    );
  });
}

async function processBGTQueueBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.QueueBoost.decode(log);
  await updateBGTDelegation(
    sender.toLowerCase(),
    validator.toLowerCase(),
    amount,
    0n,
    mctx
  );
}

async function processBGTActivateBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.ActivateBoost.decode(log);
  await updateBGTDelegation(
    sender.toLowerCase(),
    validator.toLowerCase(),
    -amount,
    amount,
    mctx
  );
}

async function processBGTCancelBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.CancelBoost.decode(log);
  await updateBGTDelegation(
    sender.toLowerCase(),
    validator.toLowerCase(),
    -amount,
    0n,
    mctx
  );
}

async function processBGTDropBoost(log: Log, mctx: MappingContext) {
  const { sender, validator, amount } = bgtAbi.events.DropBoost.decode(log);
  await updateBGTDelegation(
    sender.toLowerCase(),
    validator.toLowerCase(),
    0n,
    -amount,
    mctx
  );
}

async function processOwnershipTransferred(log: Log, mctx: MappingContext) {
  const { oldOwner, newOwner } =
    honeyLockerAbi.events.OwnershipTransferred.decode(log);
  mctx.store.defer(Locker, log.address.toLowerCase());
  mctx.queue.push(async () => {
    const locker = await mctx.store.get(Locker, log.address.toLowerCase());
    if (locker) {
      await mctx.store.upsert(
        new Locker({
          id: log.address.toLowerCase(),
          owner: newOwner.toLowerCase(),
        })
      );
    }
  });
}

async function processXKDKFinalizedRedeem(
  log: Log,
  block: any,
  mctx: MappingContext
) {
  const { userAddress, xKodiakAmount } =
    xkdkAbi.events.FinalizeRedeem.decode(log);
  
  // Look up the locker by the adapter address (userAddress)
  mctx.store.defer(Adapter, userAddress.toLowerCase());
  mctx.queue.push(async () => {
    const adapter = await mctx.store.get(Adapter, userAddress.toLowerCase());
    if (adapter) {
      await mctx.store.upsert(
        new XKDKFinalizedRedeem({
          id: log.id,
          locker: adapter.locker,
          amount: xKodiakAmount,
          timestamp: BigInt(block.header.timestamp),
          transactionHash: log.transaction?.hash,
        })
      );
    }
  });
}

async function processXKDKRedeem(log: Log, block: any, mctx: MappingContext) {
  const { userAddress, xKodiakAmount, kodiakAmount, duration } =
    xkdkAbi.events.Redeem.decode(log);
  
  // Look up the locker by the adapter address (userAddress)
  mctx.store.defer(Adapter, userAddress.toLowerCase());
  mctx.queue.push(async () => {
    const adapter = await mctx.store.get(Adapter, userAddress.toLowerCase());
    if (adapter) {
      await mctx.store.upsert(
        new XKDKRedeem({
          id: log.id,
          locker: adapter.locker,
          xKodiakAmount: xKodiakAmount,
          kodiakAmount: kodiakAmount,
          duration: duration,
          timestamp: BigInt(block.header.timestamp),
          transactionHash: log.transaction?.hash,
        })
      );
    }
  });
}

async function processERC20Transfer(
  log: Log,
  block: any,
  mctx: MappingContext
) {
  const { from, to, value } = erc20Abi.events.Transfer.decode(log);

  mctx.store.defer(Locker, to.toLowerCase());
  mctx.store.defer(Locker, from.toLowerCase());

  mctx.queue.push(async () => {
    const isToVault = await mctx.store.get(Locker, to.toLowerCase());
    if (isToVault) {
      await updateVaultBalance(
        to.toLowerCase(),
        log.address.toLowerCase(),
        BigInt(value),
        mctx
      );
    }
  });

  mctx.queue.push(async () => {
    const isFromVault = await mctx.store.get(Locker, from.toLowerCase());
    if (isFromVault) {
      await updateVaultBalance(
        from.toLowerCase(),
        log.address.toLowerCase(),
        BigInt(-value),
        mctx
      );
    }
  });
}

async function updateVaultBalance(
  lockerAddress: string,
  tokenAddress: string,
  amount: bigint,
  mctx: MappingContext
) {
  const id = `${lockerAddress.toLowerCase()}-${tokenAddress.toLowerCase()}`;
  mctx.store.defer(LockerBalance, id);
  mctx.queue.push(async () => {
    const existingBalance = await mctx.store.get(LockerBalance, id);

    await mctx.store.upsert(
      new LockerBalance({
        id,
        locker: lockerAddress.toLowerCase(),
        token: tokenAddress.toLowerCase(),
        balance: (existingBalance?.balance || 0n) + amount,
      })
    );
  });
}

async function updateLockerTotalDeposit(
  lockerAddress: string,
  token: string,
  amount: bigint,
  mctx: MappingContext
) {
  const id = lockerAddress.toLowerCase() + "-" + token.toLowerCase();
  mctx.store.defer(LockerTotalDeposit, id);
  mctx.queue.push(async () => {
    const existingDeposit = await mctx.store.get(LockerTotalDeposit, id);
    await mctx.store.upsert(
      new LockerTotalDeposit({
        id: id,
        locker: lockerAddress.toLowerCase(),
        token: token.toLowerCase(),
        amount: (existingDeposit?.amount || BigInt(0)) + amount,
        lockExpiration: existingDeposit?.lockExpiration,
      })
    );
  });
}

async function updateVaultTotalStake(
  lockerAddress: string,
  token: string,
  vault: string,
  amount: bigint,
  mctx: MappingContext
) {
  const id =
    lockerAddress.toLowerCase() +
    "-" +
    token.toLowerCase() +
    "-" +
    vault.toLowerCase();
  mctx.store.defer(LockerTotalStake, id);
  mctx.queue.push(async () => {
    const existingStake = await mctx.store.get(LockerTotalStake, id);
    await mctx.store.upsert(
      new LockerTotalStake({
        id,
        locker: lockerAddress.toLowerCase(),
        token: token.toLowerCase(),
        vault: vault.toLowerCase(),
        amount: (existingStake?.amount || BigInt(0)) + amount,
      })
    );
  });
}

async function updateBGTDelegation(
  locker: string,
  validator: string,
  queuedChange: bigint,
  activatedChange: bigint,
  mctx: MappingContext
) {
  const id = locker.toLowerCase() + "-" + validator.toLowerCase();
  mctx.store.defer(BGTDelegation, id);
  mctx.queue.push(async () => {
    const existingDelegation = await mctx.store.get(BGTDelegation, id);
    await mctx.store.upsert(
      new BGTDelegation({
        id,
        locker: locker.toLowerCase(),
        validator: validator.toLowerCase(),
        queued: (existingDelegation?.queued || BigInt(0)) + queuedChange,
        activated:
          (existingDelegation?.activated || BigInt(0)) + activatedChange,
      })
    );
  });
}
