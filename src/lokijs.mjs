/**
 * ESM entry point for LokiJS.
 *
 * The implementation lives in the UMD build at `./lokijs.js`; this wrapper
 * exposes it to native ESM consumers (`import loki from 'lokijs'`) and adds
 * named exports for the classes and helpers attached to the Loki constructor.
 */
import loki from './lokijs.js';

export default loki;

export const {
  deepFreeze,
  freeze,
  unFreeze,
  LokiOps,
  Collection,
  DynamicView,
  Resultset,
  KeyValueStore,
  LokiMemoryAdapter,
  LokiPartitioningAdapter,
  LokiLocalStorageAdapter,
  LokiFsAdapter,
  persistenceAdapters,
  aeq,
  lt,
  gt,
  Comparators
} = loki;
