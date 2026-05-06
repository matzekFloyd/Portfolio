# Contributing

This repository uses `production` as the stable deploy branch.

## Branching and Deploy Flow

1. Start from latest `production`.
2. Create a short-lived branch for one focused change.
3. Open a pull request into `production`.
4. Merge after checks/review pass.
5. Deployment is triggered from `production`.

## Recommended Branch Naming

Use this format:

`[initials/]PF-<number>--<short-kebab-description>`

`initials/` is optional and must be 2-3 lowercase letters.

Examples:

- `PF-5--migration-baseline-target`
- `PF-12--contact-form`
- `PF-21--mobile-header-spacing`
- `mm/PF-5--migration-baseline-target`

## Typical Local Workflow

```bash
git checkout production
git pull
git checkout -b mm/PF-12--my-change
# work, test, commit
git push -u origin mm/PF-12--my-change
```

Then open a PR from your branch to `production`.
