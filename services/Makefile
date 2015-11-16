# Modify the path so that we can find Jasmine and other tools
PATH  := node_modules/.bin:$(PATH)

# Normal make targets represet files or directories that need to be built. Phony targets don't.
.PHONY: all clean test dist

# The default target
all: clean test dist

clean: 
	rm -rf dist
	rm -rf archive.zip

node_modules:
	npm install

test: node_modules
	@NODE_PATH=./lib jasmine

archive.zip: clean
	mkdir -p dist
	cp -r node_modules dist/
	cp -r lib/* dist/
	cd dist; zip -r ../archive.zip *
	rm -rf dist

dist: archive.zip

deploy: dist
	@echo "Deploying Lambda Function"
	node ./lib/deploy.js prod
