#!/bin/sh
ansible-playbook ./deploy-app.yml -i ./hosts -u root "$@"
