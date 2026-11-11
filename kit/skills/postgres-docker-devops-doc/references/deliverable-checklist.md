# PostgreSQL Docker DevOps deliverable checklist

Use this as a completeness checklist for client-facing Markdown documents.

## Security baseline

- Debian update and reboot.
- Dedicated admin user with `sudo`.
- SSH key authentication.
- Root SSH login disabled.
- Password SSH login disabled after key validation.
- Timezone configured.
- Base tools installed.
- UFW default deny incoming and allow outgoing.
- SSH allowed only from admin IP/VPN where possible.
- PostgreSQL allowed only from app server, private network, VPN, or localhost tunnel.
- Grafana/pgAdmin restricted by VPN, reverse proxy, or IP whitelist.
- Prometheus and exporters not public.
- Prometheus host port uses a non-conflicting value such as `19090` when Grafana runs on another server.
- Grafana runs on a separate server when requested and connects to Prometheus through private IP/VPN.
- Fail2Ban configured for SSH.
- Docker group privilege warning included.

## Files expected in full guide

- `/opt/postgres-platform/.env`
- `/opt/postgres-platform/docker-compose.yml`
- `/opt/postgres-platform/prometheus/prometheus.yml`
- Grafana server: `/etc/grafana/provisioning/datasources/prometheus.yml`
- Grafana server: `/etc/grafana/provisioning/dashboards/postgres-platform.yml`
- Grafana server: `/var/lib/grafana/dashboards/postgres-platform/postgresql-platform-overview.json`
- `/opt/postgres-platform/scripts/backup_postgres.sh`
- `/opt/postgres-platform/scripts/restore_postgres.sh`
- User crontab entry for daily backups.

## Compose requirements

- Services: `postgres`, `postgres-exporter`, `node-exporter`, `prometheus`.
- Optional admin profile: `pgadmin`.
- Networks: database/internal and monitoring.
- Volumes: PostgreSQL, Prometheus, optional pgAdmin.
- Restart policy: `unless-stopped`.
- PostgreSQL healthcheck using `pg_isready`.
- Prometheus config validation healthcheck if reliable.
- Log rotation via `json-file` with `max-size` and `max-file`.
- No `grafana` service in the PostgreSQL/Prometheus compose when Grafana is on a separate server.
- `security_opt: no-new-privileges:true` where compatible.
- Secrets pulled from `.env`.

## Metrics expected in dashboard

Server:

- CPU usage.
- RAM usage.
- Disk usage.
- Swap usage.
- System load.
- Network receive/transmit.
- Active/running/blocked processes.
- Uptime.

PostgreSQL:

- `pg_up`.
- Active connections.
- Maximum connections.
- Transactions commit/rollback rate.
- Locks.
- Database size.
- Tuple activity.
- Activity by state.
- Slow query note via `pg_stat_statements`, not as a default metric.

## Backup requirements

- Backup file name includes database and timestamp.
- Output is compressed.
- Logs are written.
- Errors fail the script.
- Empty backup detection.
- Checksum file generated.
- Old backup cleanup by retention days.
- Restore script asks for explicit confirmation.
- Restore validates checksum when present.
- Crontab includes stdout/stderr redirection.
- Document how to validate the backup and test restore.

## Final validation

- JSON blocks parse with `json.loads`.
- YAML examples are visually checked and, where possible, validated with `docker compose config`.
- Commands are copy/paste friendly.
- All sensitive placeholders are marked.
- Final checklist covers security, Docker, PostgreSQL, Prometheus, Grafana, backups, crontab, restore test, ports, and access controls.
