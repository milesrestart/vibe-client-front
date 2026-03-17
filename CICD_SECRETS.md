# GitHub Actions Deploy Secrets (Front)

Configure these repository secrets:

- `FRONT_SSH_HOST`: deploy server host/IP
- `FRONT_SSH_PORT`: ssh port (usually `22`)
- `FRONT_SSH_USER`: ssh user
- `FRONT_SSH_KEY`: private key content
- `FRONT_DEPLOY_PATH`: nginx static path, e.g. `/var/www/vibe-client-front`

Workflow file:
- `.github/workflows/deploy.yml`
