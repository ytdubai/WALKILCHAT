# WakilChat™ Deployment Guide

## Production Deployment Checklist

### Pre-Deployment (Complete These First)

#### 1. Environment Configuration

**Required API Keys:**
- ✅ Supabase project created
- ✅ Google Cloud Translation API enabled
- ⏳ Ethio Telecom VAS credentials (contact Ethio Telecom)
- ⏳ Daily.co API key (for video calls) - or use self-hosted WebRTC

**Environment Variables:**
```bash
# Copy production template
cp .env.example .env.production

# Fill in all required values
nano .env.production
```

#### 2. Database Setup

**Option A: Supabase (Recommended)**
```bash
# Already configured in .env
# Run migrations
DATABASE_URL="postgresql://xxx" npx prisma migrate deploy
```

**Option B: Self-hosted PostgreSQL**
```bash
# Install PostgreSQL
sudo apt install postgresql

# Create database
sudo -u postgres createdb wakilchat
sudo -u postgres psql -c "CREATE USER wakilchat WITH PASSWORD 'xxx';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE wakilchat TO wakilchat;"

# Run migrations
npx prisma migrate deploy
```

#### 3. Storage Setup

**Supabase Storage:**
- Create bucket: `product-images`
- Set to public
- Run policies from `scripts/setup-storage.sql`

#### 4. Domain & SSL

**DNS Configuration:**
```
A record: wakilchat.com → [Your server IP]
A record: *.wakilchat.com → [Your server IP]
```

**SSL Certificate:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d wakilchat.com -d www.wakilchat.com
```

### Deployment Steps

#### On Contabo VPS (Ubuntu 22.04)

**1. Install Dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install PostgreSQL (if self-hosting)
sudo apt install -y postgresql postgresql-contrib
```

**2. Clone & Build:**
```bash
# Create deployment user
sudo adduser wakilchat
sudo usermod -aG sudo wakilchat
sudo su - wakilchat

# Clone repository
cd /home/wakilchat
git clone https://github.com/ytdubai/WALKILCHAT.git app
cd app

# Install dependencies
npm install --production

# Build Next.js
npm run build
```

**3. Configure PM2:**
```bash
# Create ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'wakilchat',
    script: 'npm',
    args: 'start',
    cwd: '/home/wakilchat/app',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/wakilchat/logs/error.log',
    out_file: '/home/wakilchat/logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G'
  }]
}
EOF

# Create logs directory
mkdir -p /home/wakilchat/logs

# Start PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**4. Configure Nginx:**
```bash
sudo nano /etc/nginx/sites-available/wakilchat

# Add configuration:
```

```nginx
upstream wakilchat {
  server 127.0.0.1:3000;
  keepalive 64;
}

server {
  listen 80;
  listen [::]:80;
  server_name wakilchat.com www.wakilchat.com;
  
  # Redirect to HTTPS
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name wakilchat.com www.wakilchat.com;

  # SSL configuration
  ssl_certificate /etc/letsencrypt/live/wakilchat.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/wakilchat.com/privkey.pem;
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
  ssl_prefer_server_ciphers on;

  # Security headers
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Strict-Transport-Security "max-age=31536000" always;

  # Gzip
  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss;

  # Client max body size (for image uploads)
  client_max_body_size 10M;

  # Proxy to Next.js
  location / {
    proxy_pass http://wakilchat;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
  }

  # Socket.io WebSocket
  location /socket.io/ {
    proxy_pass http://wakilchat;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # Static files
  location /_next/static/ {
    proxy_pass http://wakilchat;
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, immutable";
  }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/wakilchat /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**5. Firewall:**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 5432/tcp  # PostgreSQL (if self-hosting)
sudo ufw enable
```

### Post-Deployment

#### Monitoring

```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs wakilchat

# Restart if needed
pm2 restart wakilchat
```

#### Database Backups

```bash
# Daily backup script
cat > /home/wakilchat/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/wakilchat/backups"
mkdir -p $BACKUP_DIR

# Backup database
PGPASSWORD="xxx" pg_dump -h localhost -U wakilchat wakilchat | gzip > $BACKUP_DIR/wakilchat_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
EOF

chmod +x /home/wakilchat/backup.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/wakilchat/backup.sh") | crontab -
```

#### Updates

```bash
# Pull latest code
cd /home/wakilchat/app
git pull origin main

# Install dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Rebuild
npm run build

# Restart
pm2 restart wakilchat
```

### Health Checks

**Endpoints to monitor:**
- https://wakilchat.com (homepage)
- https://wakilchat.com/api/auth/test (auth status)
- https://wakilchat.com/api/translate (translation service)

**Monitoring tools:**
- UptimeRobot (external monitoring)
- PM2 Plus (process monitoring)
- Sentry (error tracking)

### Troubleshooting

**App won't start:**
```bash
# Check logs
pm2 logs wakilchat --lines 100

# Check environment
pm2 env 0

# Rebuild
cd /home/wakilchat/app
npm run build
pm2 restart wakilchat
```

**Database connection issues:**
```bash
# Test connection
PGPASSWORD="xxx" psql -h localhost -U wakilchat -d wakilchat -c "SELECT version();"

# Check PostgreSQL status
sudo systemctl status postgresql
```

**Nginx issues:**
```bash
# Test configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Security Hardening

**1. Disable root SSH:**
```bash
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl reload sshd
```

**2. Install Fail2Ban:**
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

**3. Regular updates:**
```bash
sudo apt update && sudo apt upgrade -y
```

## Performance Optimization

**1. Enable Redis caching:**
```bash
sudo apt install redis-server
sudo systemctl enable redis-server
```

**2. Database optimization:**
```sql
-- Add indexes (already in schema, but verify)
CREATE INDEX IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX IF NOT EXISTS idx_product_category ON "Product"(category);
CREATE INDEX IF NOT EXISTS idx_match_status ON "Match"(status);
```

**3. CDN (optional):**
- CloudFlare for static assets
- Supabase CDN for images

---

## 🚨 IMPORTANT

**Before going live:**
- [ ] All API keys configured
- [ ] SSL certificate active
- [ ] Database backups automated
- [ ] Monitoring enabled
- [ ] Error tracking configured
- [ ] Legal pages complete (Terms, Privacy)
- [ ] Test all features end-to-end

**Do NOT deploy without:**
- Valid SSL certificate
- Secure environment variables
- Database backups
- Error monitoring

---

**Need help? Contact ytmesfin@icloud.com**
