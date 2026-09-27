# LokiJS type definitions

`lokijs.d.ts` is vendored from the DefinitelyTyped package
[`@types/lokijs`](https://www.npmjs.com/package/@types/lokijs) (version 1.5.14,
MIT licensed — see `LICENSE`). Vendoring keeps the types available to consumers
without depending on DefinitelyTyped at install time.

The definitions are referenced from `package.json` via the `types` field and the
`types` condition of the `exports` map, so TypeScript picks them up
automatically for both `require` and `import` consumers.

To update them:

```sh
npm pack @types/lokijs
tar -xzf types-lokijs-*.tgz
cp package/index.d.ts types/lokijs.d.ts
```
