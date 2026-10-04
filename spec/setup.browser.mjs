import lokiSource from '../src/lokijs.js?raw';
import incrementalIndexedDbSource from '../src/incremental-indexeddb-adapter.js?raw';

// The LokiJS sources are UMD/CommonJS files, which Vite cannot import as ES
// modules in the browser. Evaluate the original sources instead so the specs
// get the same globals they used to receive from <script> tags under Karma.
new Function(lokiSource)();
new Function(incrementalIndexedDbSource)();
