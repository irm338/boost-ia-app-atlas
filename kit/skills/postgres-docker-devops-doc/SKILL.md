---
name: postgres-docker-devops-doc
description: Create client-ready Spanish DevOps documentation and runbooks for secure Linux servers running PostgreSQL in Docker with Docker Compose, Prometheus, Grafana, exporters, pgAdmin, backups, restore procedures, firewall hardening, redundancy options, maintenance, troubleshooting, and corporate checklists. Use when the user asks for a professional PostgreSQL Docker server guide, operations manual, deployment document, backup/monitoring runbook, or reusable client deliverable in Markdown.
---

# PostgreSQL Docker DevOps Documentation

## Workflow

1. Write in Spanish unless the user asks otherwise.
2. Produce a professional Markdown deliverable suitable for a client.
3. Prefer Debian 12 Bookworm or Debian 13 Trixie examples unless the user specifies another distro.
4. Verify unstable install instructions before finalizing, especially Docker, Compose, Grafana, Prometheus, PostgreSQL exporter versions, package names, and current official commands.
5. Use official documentation for current commands where possible; cite sources if web verification was used.
6. Include complete copy/paste blocks, then short validation commands after each major section.
7. Mark sensitive values clearly with `CAMBIAR_CLIENTE` and warn not to store secrets in public docs.
8. Keep the recommended architecture pragmatic: secure single server plus backups and monitoring first; advanced HA only as a phased option.
9. If creating a local artifact, write a `.md` file in the requested folder or a sensible docs folder, then validate embedded JSON/YAML where practical.

## Required Deliverable Shape

Include these sections unless the user narrows scope:

- Initial Linux preparation: update, admin user, SSH hardening, timezone, base packages, basic practices.
- Security and firewall: UFW or distro equivalent, port table, SSH whitelist, PostgreSQL/Grafana/Prometheus exposure guidance, Fail2Ban, VPN/IP whitelist.
- Docker and Compose installation on Debian: official repository method, service enablement, validation, docker group warning.
- Corporate folder structure under `/opt/postgres-platform`.
- Complete `.env` for the PostgreSQL/Prometheus server with PostgreSQL, Prometheus, ports, paths, passwords, timezone, backup retention, and no Grafana variables when Grafana is separate.
- Complete `docker-compose.yml` for the PostgreSQL/Prometheus server with PostgreSQL, optional pgAdmin, Prometheus, Node Exporter, PostgreSQL Exporter, volumes, networks, restart policies, healthchecks where reliable, controlled logs, comments. Do not include Grafana in this compose when the user wants Grafana on another server.
- PostgreSQL operations: startup, validation, psql access, external client/pgAdmin access, DB/user/role creation, permissions, production tuning notes, startup failure diagnosis.
- Complete `prometheus.yml` with scrape jobs for Prometheus, Node Exporter, PostgreSQL Exporter.
- Grafana installation on a separate Debian server, password change, datasource provisioning pointing to Prometheus over private IP/VPN, dashboard import, folder organization, security recommendations.
- Grafana dashboard JSON for server and PostgreSQL metrics.
- Backup and restore scripts: `backup_postgres.sh`, `restore_postgres.sh`, crontab, logs, retention, validation.
- Redundancy by phases: local backups, external backups, snapshots, persistent volumes, primary/secondary replication only when warranted.
- Maintenance commands: status, logs, restart, resource usage, disk usage, image updates, safe update procedure.
- Troubleshooting: Docker down, PostgreSQL down, ports busy, volume permissions, Grafana/Prometheus connection issues, exporters missing, empty backup, authentication errors, full disk, restarting containers.
- Final checklist and additional recommendations.

## Implementation Guidance

- Prefer `docker compose`, not legacy `docker-compose`.
- Use Docker's Debian repository (`download.docker.com/linux/debian`) for Debian servers; do not use Ubuntu repository commands on Debian.
- If Prometheus is published for Grafana on another server, use a non-default host port such as `19090` mapped to container `9090` to avoid conflicts with host Prometheus installations.
- Bind Prometheus to a private/VPN IP when Grafana is on another server; do not bind it publicly.
- Warn that Docker-published ports can interact unexpectedly with UFW; recommend binding sensitive ports to localhost, VPN, private networks, or using `DOCKER-USER` rules for strict filtering.
- Do not publish exporters publicly. Prometheus, Node Exporter, and PostgreSQL Exporter should be internal.
- Prefer named volumes for Docker data and a host folder for backup artifacts.
- Include `json-file` log rotation in Compose examples.
- Use `pg_dump | gzip` for logical backups and provide checksum generation.
- Explain that changing `POSTGRES_PASSWORD` in `.env` does not alter an existing PostgreSQL role once the volume already exists.
- For slow query visibility, mention `pg_stat_statements`; do not claim it works by default.
- Use placeholders and example IPs from documentation ranges when needed: `203.0.113.10`, `198.51.100.20`, `198.51.100.30`.
- Keep Grafana separate by default when requested: install it on its own Debian server using the Grafana APT repository, not inside the PostgreSQL compose.
- Keep solutions corporate but not overbuilt. Present HA as optional phased work.

## Reference

Read `references/deliverable-checklist.md` when producing a full client document or when checking whether a generated runbook is complete.
