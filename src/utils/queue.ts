import { store } from "../index";

export type calcWatchTimeArgs = { money: number; queueNumber: number };

export const calcWatchTime = (opts: calcWatchTimeArgs) => {
  const state = store.getState();
  const queueType = state.settings.queueType;
  const basePrice = state.settings.basePriceForMinute;

  let pricePer60secs: number;

  if (queueType === "arithmetic") {
    pricePer60secs = basePrice * opts.queueNumber;
  } else {
    pricePer60secs = (basePrice * 2 ** opts.queueNumber) / 2;
  }

  const minutes = opts.money / pricePer60secs;

  return minutes * 60;
};
