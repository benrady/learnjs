
## Running the Development Server

`bundle install`
`bundle exec guard`

Go to http://localhost:9292 for the app

Go to http://localhost:9292/tests for the tests

It will reload automatically as you change files

## Applying patches

To apply the patches in the ./patches directory run this command:

```
git am --whitespace=error patches/*
```
