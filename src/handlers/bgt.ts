import { Log } from "../processor";
import { MappingContext } from "../types";
import {
  BGTBoostActionType,
  BGTBoostAction,
  BGTFinalBoostStatus,
} from "../model";
import * as bgtAbi from "../abi/BGT";

export async function processBGTEvent(
  log: Log,
  mctx: MappingContext,
  action: BGTBoostActionType,
  event: "ActivateBoost" | "QueueBoost" | "DropBoost" | "QueueDropBoost" | "CancelBoost" | "CancelDropBoost"
) {
  const { user, pubkey, amount } = bgtAbi.events[event].decode(log);
  const boostActionId = `${user.toLowerCase()}-${pubkey.toLowerCase()}-${
    log.id
  }`;
  const finalBoostStatusId = `${user.toLowerCase()}-${pubkey.toLowerCase()}`;

  mctx.store.defer(BGTFinalBoostStatus, finalBoostStatusId);
  mctx.queue.push(async () => {
    const existingFinalBoostStatus = await mctx.store.get(
      BGTFinalBoostStatus,
      finalBoostStatusId
    );

    let newQueuedBoostAmount =
      existingFinalBoostStatus?.queuedBoostAmount ?? BigInt(0);
    let newActivatedBoostAmount =
      existingFinalBoostStatus?.activatedBoostAmount ?? BigInt(0);
    let newQueuedDropAmount =
      existingFinalBoostStatus?.queuedDropAmount ?? BigInt(0);

    switch (action) {
      case BGTBoostActionType.BOOST_QUEUED:
        newQueuedBoostAmount += amount;
        break;
      case BGTBoostActionType.BOOST_ACTIVATED:
        newActivatedBoostAmount += amount;
        newQueuedBoostAmount -= amount;
        break;
      case BGTBoostActionType.DROP_BOOST_QUEUED:
        newQueuedDropAmount += amount;
        newActivatedBoostAmount -= amount;
        break;
      case BGTBoostActionType.DROP_BOOST:
        newQueuedDropAmount -= amount;
        break;
      case BGTBoostActionType.CANCELED_BOOST_QUEUED:
        newQueuedBoostAmount -= amount;
        break;
      case BGTBoostActionType.CANCELED_DROP_BOOST_QUEUED:
        newQueuedDropAmount -= amount;
        break;
    }

    await mctx.store.upsert(
      new BGTBoostAction({
        id: boostActionId,
        locker: user.toLowerCase(),
        validator: pubkey.toLowerCase(),
        amount,
        action: BGTBoostActionType.BOOST_ACTIVATED,
        timestamp: BigInt(log.block.timestamp),
        transactionHash: log.transaction?.hash || "",
      })
    );

    await mctx.store.upsert(
      new BGTFinalBoostStatus({
        id: finalBoostStatusId,
        locker: user.toLowerCase(),
        validator: pubkey.toLowerCase(),
        queuedBoostAmount: newQueuedBoostAmount,
        activatedBoostAmount: newActivatedBoostAmount,
        queuedDropAmount: newQueuedDropAmount,
      })
    );
  });
}

// export async function processBGTQueueBoost(log: Log, mctx: MappingContext) {
//     const { user, pubkey, amount } = bgtAbi.events.QueueBoost.decode(log);
//     const id = `${user.toLowerCase()}-${pubkey.toLowerCase()}-${log.id}`;
//     const finalBoostStatusId = `${user.toLowerCase()}-${pubkey.toLowerCase()}`;

//     mctx.store.defer(BGTFinalBoostStatus, finalBoostStatusId);
//     mctx.queue.push(async () => {
//       await mctx.store.upsert(
//         new BGTBoostAction({
//           id,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           amount,
//           action: BGTBoostActionType.BOOST_QUEUED,
//           timestamp: BigInt(log.block.timestamp),
//           transactionHash: log.transaction?.hash || "",
//         })
//       );

//       await mctx.store.upsert(
//         new BGTFinalBoostStatus({
//           id: finalBoostStatusId,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           queuedBoostAmount: amount,
//         })
//       );
//     });
//   }

//   export async function processBGTActivateBoost(log: Log, mctx: MappingContext) {
//     const { user, pubkey, amount } = bgtAbi.events.ActivateBoost.decode(log);
//     const boostActionId = `${user.toLowerCase()}-${pubkey.toLowerCase()}-${log.id}`;
//     const finalBoostStatusId = `${user.toLowerCase()}-${pubkey.toLowerCase()}`;

//     mctx.store.defer(BGTFinalBoostStatus, finalBoostStatusId);
//     mctx.queue.push(async () => {
//       const existingFinalBoostStatus = await mctx.store.get(BGTFinalBoostStatus, finalBoostStatusId);

//       await mctx.store.upsert(
//         new BGTBoostAction({
//           id: boostActionId,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           amount,
//           action: BGTBoostActionType.BOOST_ACTIVATED,
//           timestamp: BigInt(log.block.timestamp),
//           transactionHash: log.transaction?.hash || "",
//         })
//       );

//       await mctx.store.upsert(
//         new BGTFinalBoostStatus({
//           id: finalBoostStatusId,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           amount: (existingFinalBoostStatus?.amount ?? BigInt(0)) + amount,
//         })
//       );
//     });
//   }

//   export async function processBGTQueueDropBoost(log: Log, mctx: MappingContext) {
//     const { user, pubkey, amount } = bgtAbi.events.QueueDropBoost.decode(log);
//     const id = `${user.toLowerCase()}-${pubkey.toLowerCase()}-${log.id}`;

//     mctx.queue.push(async () => {
//       await mctx.store.upsert(
//         new BGTBoostAction({
//           id,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           amount,
//           action: BGTBoostActionType.DROP_BOOST_QUEUED,
//           timestamp: BigInt(log.block.timestamp),
//           transactionHash: log.transaction?.hash || "",
//         })
//       );
//     });
//   }

//   export async function processBGTActivateDropBoost(log: Log, mctx: MappingContext) {
//     const { user, pubkey, amount } = bgtAbi.events.DropBoost.decode(log);
//     const boostActionId = `${user.toLowerCase()}-${pubkey.toLowerCase()}-${log.id}`;
//     const finalBoostStatusId = `${user.toLowerCase()}-${pubkey.toLowerCase()}`;

//     mctx.store.defer(BGTFinalBoostStatus, finalBoostStatusId);
//     mctx.queue.push(async () => {
//       const existingFinalBoostStatus = await mctx.store.get(BGTFinalBoostStatus, finalBoostStatusId);

//       await mctx.store.upsert(
//         new BGTBoostAction({
//           id: boostActionId,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           amount,
//           action: BGTBoostActionType.DROP_BOOST_ACTIVATED,
//           timestamp: BigInt(log.block.timestamp),
//           transactionHash: log.transaction?.hash || "",
//         })
//       );

//       await mctx.store.upsert(
//         new BGTFinalBoostStatus({
//           id: finalBoostStatusId,
//           locker: user.toLowerCase(),
//           validator: pubkey.toLowerCase(),
//           amount: (existingFinalBoostStatus?.amount ?? BigInt(0)) - amount,
//         })
//       );
//     });
//   }
