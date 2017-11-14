cd tetris-app

npm run build

mkdir ../docs
touch ../docs/CNAME
cp ../docs/CNAME CNAME.temp
rm -r ../docs

mkdir ../docs
cp -a build/ ../docs
cp CNAME.temp ../docs/CNAME
rm CNAME.temp
cp README_BUILD.md ../docs/README.md

cd ..
git add .
git commit -m '[deploy][skip ci]'
git push
