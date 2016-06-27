# Step 1: Install brunch & bower & npm

To build/serve our app you need install following packages:

- Brunch
- Bower


### Installing Brunch
`
npm install -g brunch
`
### Installing Bower

`npm install -g bower`

# Step 2: Git clone
To clone this repository you need:
```
git clone https://github.com/Shugar/breezy breezy-mainpage
```

# Step 3: Install project plugins
To install npm & bower plugins you need put in terminal following commands:
```
cd breezy-mainpage //go to our folder
npm install
bower install
```

# Step 4: Serve/Build app

To serve your app you need go to your project folder and put in terminal following commands like
```
brunch w -s
```

To build your app to static files without `--watch` you need
```
brunch build
```

To build app to production version (minified code and etc) —
```
brunch build -p
```
