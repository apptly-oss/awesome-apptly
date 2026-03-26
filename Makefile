.PHONY: all dev build clean check-spelling lint
.PHONY: FORCE

TOOLSDIR := $(CURDIR)/internal/build

FIX_WHITESPACE ?= $(TOOLSDIR)/fix_whitespace.sh
FIX_WHITESPACE_ARGS ?= .

PNPM ?= pnpm
PNPX ?= pnpx

FIND_EXCLUDE ?= -path './.tmp' -prune -o -path './node_modules' -prune -o -path './.output' -prune -o -path './.nuxt' -prune -o -path './.wrangler' -prune -o
FIND_FILES_MARKDOWN_ARGS ?= $(FIND_EXCLUDE) -name '*.md' -print0

ifndef CSPELL
ifeq ($(shell $(PNPX) cspell --version 2>&1 | grep -q '^[0-9]' && echo yes),yes)
CSPELL = $(PNPX) cspell
else
CSPELL = true
endif
endif
CSPELL_FLAGS ?= --no-progress --dot --config $(TOOLSDIR)/cspell.json

V = 0
Q = $(if $(filter 1,$V),,@)
M = $(shell if [ "$$(tput colors 2> /dev/null || echo 0)" -ge 8 ]; then printf "\033[34;1m▶\033[0m"; else printf "▶"; fi)

all: tidy build

fmt: ; $(info $(M) hunting down whitespace issues…)
	$Q $(FIX_WHITESPACE) $(FIX_WHITESPACE_ARGS)

ifneq ($(CSPELL),true)
TIDY_SPELLING = check-spelling
check-spelling: FORCE ; $(info $(M) check spelling…)
	$Q find . $(FIND_FILES_MARKDOWN_ARGS) | xargs -0 -r $(CSPELL) $(CSPELL_FLAGS)
else
TIDY_SPELLING =
check-spelling: FORCE ; $(info $(M) spell checking disabled)
endif

lint: node_modules/.modules.yaml ; $(info $(M) linting…)
	$Q $(PNPM) lint

tidy: fmt lint $(TIDY_SPELLING)

node_modules/.modules.yaml: package.json pnpm-lock.yaml
	$Q $(PNPM) install

build: node_modules/.modules.yaml ; $(info $(M) building…)
	$Q $(PNPM) build

dev: node_modules/.modules.yaml ; $(info $(M) starting dev server…)
	$Q $(PNPM) dev

clean: FORCE ; $(info $(M) cleaning…)
	$Q $(PNPM) clean
