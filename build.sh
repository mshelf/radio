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

git add -A && git commit -m "build"
git push origin master

cd ../radio