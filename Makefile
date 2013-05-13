
test:
	./node_modules/.bin/mocha ./test/index.js

test-watch:
	./node_modules/.bin/mocha ./test/index.js --watch

test-ci:
	./node_modules/.bin/mocha ./test/index.js --reporter dot --ignore-leaks

.PHONY: test
