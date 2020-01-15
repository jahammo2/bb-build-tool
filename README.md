# BB Build Tool

- `TICKET_NAME` is `GEAT-216`, for example
- `SNIPPET_NAME` is `pdp-all-devices-test-sticky-cta`, for example
- git clone into dev directory of ab-test-snippets repo
- `rm -rf dev/build-tool/.git`
- run provision

## Commands

* `TICKET_NAME=GEAT-XXX yarn compile`
* `TICKET_NAME=GEAT-XXX SNIPPET_NAME=pdp-all-devices-test-sticky-cta yarn build`
* `TICKET_NAME=GEAT-XXX SNIPPET_NAME=pdp-all-devices-test-sticky-cta yarn provision` - for starting a new project. Will give you the base files and structure
