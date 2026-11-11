---
name: cloudflare-dns
description: Manage Cloudflare zone and account configuration from Codex. Use when the user wants to inspect or change DNS records, DNS settings, DNS views, SSL/TLS settings, WAF and rulesets, API Gateway settings, Access mTLS certificates, account analytics, or registrar domain information in Cloudflare.
---

# Cloudflare Dns

## Overview

This skill provides a conservative workflow for operating Cloudflare from Codex at both zone and account level.
Use it for DNS operations, zone configuration, DNS views, WAF and ruleset changes, SSL/TLS changes, API Gateway work, Access mTLS certificate management, analytics review, and registrar/domain inspection.

## Prerequisites

- Access to Cloudflare through the Cloudflare plugin, MCP tooling, or the Cloudflare REST API
- A valid token with the permissions required by the target action
- The exact zone, account, or domain to inspect or modify
- Clear intended changes for write operations
- Explicit user confirmation for destructive or high-impact actions

If credentials or tooling are missing, stop and state what is required before attempting changes.

## Execution Priority

Prefer the most structured integration available:

1. Cloudflare plugin or MCP tools
2. Cloudflare CLI or existing project automation
3. Cloudflare REST API with a scoped token

Do not invent tool names. Inspect available tools first and adapt to the integration that actually exists in the current session.

## Capability Map

This skill is expected to operate across these Cloudflare areas when the token allows them:

- Registrar domains: read domain and zone ownership context
- DNS records: list, create, update, delete, verify
- DNS settings: review and change zone-level DNS behavior
- DNS views: inspect or manage split-horizon style DNS views when configured
- Trust and security: inspect and edit supported security configuration in scope
- API Gateway: inspect and edit gateway configuration and protections
- SSL/TLS at account scope: inspect and edit certificates and related settings in scope
- Account WAF and account rulesets: inspect and edit managed configuration
- Account analytics: read analytics to support operational decisions
- Access mTLS certificates: inspect and manage mutual TLS certificates in Access

## Required Workflow

Follow these steps in order.

### Step 1
Clarify the requested change:

- Scope: account, zone, subdomain, or registrar domain
- Capability area: DNS, DNS settings, DNS views, WAF, rulesets, SSL/TLS, API Gateway, analytics, or Access mTLS
- Exact object to inspect or change
- Desired end state
- Whether the task is read-only, create, update, delete, audit, or verification

If the request is ambiguous, resolve the ambiguity before executing writes.

### Step 2
Read the current state before changing anything:

- Identify the correct account, zone, and resource identifiers
- Read the current configuration for the target object
- Check for collisions, hidden dependencies, or related objects that will be affected
- Capture the relevant before-state needed to explain or roll back the change

Always summarize the current state before a write.

### Step 3
Propose the exact change in compact form:

- Operation type
- Scope and target object
- Current value to desired value
- Impacted traffic, security posture, or certificate/rules behavior
- Whether the change is reversible and how it will be verified

For destructive or security-sensitive actions, require explicit user confirmation unless the user already requested the exact action unambiguously in the current turn.

### Step 4
Execute the change using the available Cloudflare integration.

When multiple resources could match, target the object by unique identifier when possible instead of assuming by display name alone.

### Step 5
Verify after the write:

- Re-read the modified object
- Confirm the stored values match the requested state
- Call out expected propagation, enforcement, cache, or certificate issuance timing
- Note any follow-up validation required outside Cloudflare

## Safety Rules

- Never delete or overwrite records based only on a partial hostname match.
- Never replace an apex or MX record without restating the impact.
- Treat deletes, certificate changes, WAF/ruleset edits, and broad account changes as high risk.
- Prefer idempotent behavior: if the desired state already exists, say so and avoid unnecessary writes.
- If a resource looks production-critical and the user asks vaguely to "clean up" or "open access", stop and ask for scope.
- Never disable protections, remove rules, or relax TLS posture without clearly restating the blast radius.
- Prefer least privilege tokens even if a broader token is currently available.

## Capability Workflows

### DNS Records

Use for `A`, `AAAA`, `CNAME`, `TXT`, `MX`, `NS`, `SRV`, `CAA`, and similar records.

- Identify zone and hostname
- Read matching records first
- Show old and new values
- Write only the intended record
- Re-read the hostname to confirm the final state

### DNS Settings

Use for zone-level DNS behavior.

- Read current DNS settings first
- Explain operational impact before editing
- Change one setting at a time when feasible
- Verify the stored setting after the write

### DNS Views

Use when the account has DNS views or split-horizon behavior configured.

- List existing views and targeted records
- Confirm the intended audience or network scope
- Change the correct view-specific object, not the global record by accident
- Verify the resulting view configuration

### WAF and Account Rulesets

Use for firewall posture, ruleset changes, and account-level protections.

- Read the active rulesets and current rule behavior first
- Explain whether the change blocks, logs, skips, challenges, or allows
- Require confirmation for disables, bypasses, or broad allow rules
- Verify the rule order, status, and action after the write

### SSL/TLS and Certificates

Use for account-level certificate and TLS configuration in scope.

- Read the current mode, certificate inventory, or related settings
- Explain impact on issuance, trust, origin compatibility, or handshake behavior
- Require confirmation for changes that can break traffic
- Verify the new state and note issuance or propagation timing

### API Gateway

Use for gateway discovery, schema protection, and related policy changes.

- Read current gateway configuration
- Explain the traffic or schema impact
- Apply minimal changes
- Verify the setting or policy after the write

### Access mTLS Certificates

Use for mutual TLS certificate inventory and certificate changes in Access.

- Read existing certificates first
- Confirm whether the task is create, rotate, inspect, or revoke
- Require explicit confirmation before revoke or replacement
- Verify the final certificate set and status

### Analytics and Domain Inspection

Use for read-only diagnostics and reporting.

- Read the relevant analytics or registrar/domain data
- Summarize the findings compactly
- Separate observation from inference
- Do not make config changes during analytics tasks unless the user asks

## Output Style

When performing Cloudflare operations, keep responses operational and compact:

- Brief current state
- Exact intended change
- Execution result
- Post-change verification
- Any propagation, enforcement, or risk note

## Example Requests

- "Revisa los DNS de `midominio.com` en Cloudflare y dime qué registros hay para `www`."
- "Crea un `CNAME` para `blog.midominio.com` apuntando a `ghs.googlehosted.com`."
- "Actualiza el `A` de `app.midominio.com` a `203.0.113.20` y deja `proxied` activo."
- "Elimina el TXT de verificación viejo de `midominio.com`, pero enséñame primero cuál vas a borrar."
- "Muéstrame las reglas WAF de cuenta y dime cuáles están en modo bloqueo."
- "Revisa la configuración SSL/TLS de la cuenta y dime qué puede romper tráfico si la cambiamos."
- "Lista las DNS views configuradas para este dominio."
- "Revisa API Gateway y dime qué protecciones están activas."
- "Muéstrame los certificados mTLS de Access y cuáles están por expirar."
- "Trae analytics de la cuenta para entender picos o errores antes de tocar reglas."

## Notes

If the current session includes the Cloudflare plugin or related skills, prefer those integrations over ad hoc HTTP calls. If no integration exists, fall back to the Cloudflare REST API only after confirming the needed token or environment variables are available.

Prefer read-first behavior even when the user asks for an edit immediately. For high-risk changes, present the current state and proposed mutation before executing it.
