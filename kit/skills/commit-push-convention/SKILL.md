---
name: commit-push-convention
description: >-
  Create commits and push them using the required format `feat(<pantalla>): <explicacion>` for new additions and `fix(<pantalla>): <explicacion>` for bug fixes. Use when the user asks to commit, push, publish changes, or follow this commit convention.
metadata:
  short-description: Commit and push with feat/fix pantalla format
---

# Commit Push Convention

Use this skill when the user wants Codex to create a commit and push it while following this exact convention:

`<tipo>(<pantalla>): <explicacion>`

## Required Rules

- Only use `feat` when the change adds functionality, files, UI, flows, or capabilities.
- Only use `fix` when the change corrects a bug, regression, broken behavior, or an implementation defect.
- Always include the screen, module, or area inside parentheses right after the type.
- Always add a short explanation after `:`.
- Never omit the scope.
- Never use another commit type unless the user explicitly overrides this convention.

## Commit Format

- `feat(<pantalla>): <explicacion>`
- `fix(<pantalla>): <explicacion>`

`<pantalla>` means the most relevant screen, module, feature, or affected area. Prefer concise names such as `login`, `home`, `cms-page-builder`, `checkout`, or `notifications`.

## Workflow

Follow this order unless the user asks otherwise:

1. Inspect the current changes with `git status --short` and, if needed, review the diff.
2. Infer whether the change is a `feat` or `fix` based on the actual code changes.
3. Infer the best `<pantalla>` scope from the affected files or feature area.
4. Write a concise Spanish explanation after `:`.
5. Stage the intended files.
6. Create the commit with the required format.
7. Push the current branch to origin.

## Message Quality Bar

- Keep the explanation concrete and short.
- Describe the user-facing or technical result, not the implementation trivia.
- Use lowercase unless a proper noun requires otherwise.
- Avoid vague messages like `cambios varios`, `ajustes`, or `update`.

## Examples

- `feat(login): agrega validacion visual para credenciales invalidas`
- `fix(home): corrige salto de layout en cards destacadas`
- `feat(cms-page-builder): agrega panel de presets reutilizables`
- `fix(notifications): corrige duplicado de alertas en movil`

## Execution Notes

- If the worktree has unrelated user changes, do not stage or revert them unless the user explicitly asks.
- If the branch has no upstream yet, push with upstream using the current branch name.
- If the change mixes new functionality and bug fixes, choose the dominant user-facing outcome. If it is genuinely ambiguous, explain the ambiguity briefly and pick the safer message.
