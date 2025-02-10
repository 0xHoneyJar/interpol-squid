import {
  StoreWithCache,
} from "@belopash/typeorm-store";
import { ProcessorContext } from "./processor";

export type Task = () => Promise<void>;
export type MappingContext = ProcessorContext<StoreWithCache> & { queue: Task[] };
