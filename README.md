how to use:

clone repo
```
git clone 
```

run
```
./build_app.sh
```

upload zip file into youtrack project

or

run
```
npm run build
npm run upload -- --host https://yourname.youtrack.cloud --token <your-perm-token>
```

you might find/generate your perm token here, remember to add all required permissions
```
https://yourname.youtrack.cloud/users/me?tab=account-security
```

development

Suppose that vite server runs on port 5173,
for local UI/component use development use: (comment all lines exclusively associated with youtrack)
```
npm run dev
go to http://localhost:5173/widgets/sample-widget/
```