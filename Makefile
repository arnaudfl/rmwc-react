.DEFAULT_GOAL := help
SHELL := /bin/bash

# initialize customs variables
WEBPACK := yarn run webpack
WEBPACK_DEV_SERVER := yarn run webpack-dev-server

.PHONY: help install dev start clean reset

## ------

## Initialize application

## Build project to install dependencies and compile assets
install:
	yarn install

## Use while developing (front dev mostly to transpile assets automatically)
dev:
	$(WEBPACK) -w

## Run Webpack Dev Server
start:
	$(WEBPACK_DEV_SERVER)

## Remove compiled assets
clean:
	rm -rf public/compiled

## Remove all node modules
reset:
	rm -rf node_modules

# APPLICATION
APPLICATION := $(shell (cat package.json 2>/dev/null || cat composer.json) | grep "\"name\"" | head -1 | cut -d\" -f 4 )

# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20
## Show this help
help:
	@echo '# ${YELLOW}${APPLICATION}${RESET} / ${GREEN}${ENV}${RESET}'
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			gsub(":", " ", helpCommand); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort
