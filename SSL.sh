#!/bin/sh
curl  https://get.acme.sh | sh -s email=OTC_Ecosystem_Squad@t-systems.com
alias acme.sh=~/.acme.sh/acme.sh
acme.sh --issue -d shop.eco.tsi-dev.otc-service.com --standalone

mkdir ./SSL

acme.sh --install-cert -d shop.eco.tsi-dev.otc-service.com \
--cert-file      ./SSL/chain.pem \
--key-file       ./SSL/privkey.pem \
--fullchain-file ./SSL/fullchain.pem
