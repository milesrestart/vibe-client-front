# Deploy Template

## 1) Install nginx config

```bash
sudo cp deploy/nginx/vibe-client-front.conf /etc/nginx/conf.d/
sudo nginx -t
sudo systemctl reload nginx
```

## 2) Static path

Keep `root /var/www/vibe-client-front;` same as your `FRONT_DEPLOY_PATH` secret.

## 3) API proxy

`/api` -> `127.0.0.1:8090` (client server)

## 4) Optional profile proxy

`/profile` -> `127.0.0.1:8080/profile/` for avatar/resource preview from main backend.
