esbuild assets/js/app.entry.js \
  --bundle --minify --sourcemap \
  --outfile=assets/public-assets/app.min.js

esbuild assets/css/app.entry.css \
  --bundle --minify \
  --loader:.svg=file \
  --loader:.ttf=file \
  --loader:.woff=file \
  --loader:.woff2=file \
  --asset-names=public-assets/[name]-[hash] \
  --public-path=/assets/ \
  --outfile=assets/public-assets/app.min.css
