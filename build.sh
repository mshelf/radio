npm run build

cd ../mshelf.github.io
rm index.html
rm favicon.ico
rm -rf dist/*
rm -rf img/*

cp ../radio/dist/* dist/
cp ../radio/img/* img/
cp ../radio/index.html .
cp ../radio/favicon.ico .

style_hash=($(md5sum dist/app.css))
js_app_hash=($(md5sum dist/app.js))
js_vendor_hash=($(md5sum dist/vendor.js))
sed -i "s/style_hash/${style_hash}/g" index.html
sed -i "s/js_app_hash/${js_app_hash}/g" index.html
sed -i "s/js_vendor_hash/${js_vendor_hash}/g" index.html

git add -A && git commit -m "build"
git push origin master

cd ../radio