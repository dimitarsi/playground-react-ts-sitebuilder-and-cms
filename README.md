# Investigate

TODO: nodemon crashing when compiling with `yarn build:web`

# Web Builder App

This project is under construction. A detailed description of all of its function is to be yet defined.

## Dev Topics

Here you can find some useful hint how to improve the DX

### Run Debugger

In VS Code run the `Debug Server` script.

⚠️ HINT: the source map dir needs to be relative to the build folder `dist` - `--sourcemap --source-root=../src`

## Auto restart server on change

Use `nodemon` in combination of `esbuild --watch`

1. Open to terminals
2. Run `yarn build --watch` in the first one
3. Run `yarn nodemon --inspect ./dist/index.js` in the second one. ~~The second `--dev` flag starts `esbuild serve` to enable web-builder component compilation~~
4. Run `Attach` from 'Run and Debug'. VS will automatically re-attach when the source changes because of `restart: true` is specified.
5. (Optional) Run `yarn build:web --watch` if you need also need the client-side js compilation - in case you edit the `browser.ts` and `client.tsx`

## Run Web-Builder

There has been some back and forth on how to run the web-builder

1. `--dev` flag is no longer required
2. `yarn build:web-builder --watch` to start web-builder compilation
3. Server should already be running, but if it is not started use `yarn nodemon --inspect ./dist/index.js`
