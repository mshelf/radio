if [ "$1" = "--reload-artists" ]
then
    cd ../grabber
    if npm run all
    then
        rm ../radio/data/artists/*
        cp data/dist/* ../radio/data/artists
        cd ../radio
        git add -A && git commit -m "update artists lists"
        git push origin master
    else
        echo "Error in grabber!!! Artists lists will not be updated."
        cd ../radio
    fi
fi

if [ "$2" !=  "--no-deploy" ]
then
    npm run build
    cd ../mshelf.github.io
    git pull origin master
    rm index.html
    rm favicon.ico
    rm -rf dist/*
    rm -rf img/*
    rm -rf data/artists/*

    cp ../radio/dist/* dist/
    cp ../radio/img/* img/
    cp ../radio/data/artists/* data/artists/
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
fi