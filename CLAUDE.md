# Ashford & Briggs Public Website

Product marketing site for **Paladin Veritai Agent** — a real-time AI intelligence platform for recruiting calls.

- **Domain:** ashfordbriggs.com
- **Stack:** Apache serving static HTML/CSS/JS (no build step)
- **Files:** `index.html`, `styles.css`, `script.js`
- **Branch:** `master`
- **Repository:** [AshfordBriggs/ashford-briggs-public](https://github.com/AshfordBriggs/ashford-briggs-public)

## Web Server

| Field | Value |
|-------|-------|
| Server | Web Server |
| IP | 10.0.0.80 |
| Document Root | `/var/www/html/ashford-briggs-public` |
| Service | Apache |

## SSH Credentials

| Field | Value |
|-------|-------|
| Username | mbarker |
| Password | `$boating1` |

> **Note:** Use single quotes around the password in bash to prevent shell expansion of `$`:
> ```
> sshpass -p '$boating1' ssh mbarker@10.0.0.80
> ```

## Deployment

Deployment is a git pull on the web server. No build step is required.

```bash
# SSH into the web server
sshpass -p '$boating1' ssh mbarker@10.0.0.80

# Pull latest changes (sudo required — .git is owned by root)
sudo git -C /var/www/html/ashford-briggs-public pull origin master
```

## Related Paladin Repos

| Repo | Contents |
|------|----------|
| [paladin-pbx](https://github.com/AshfordBriggs/paladin-pbx) | Server-side PBX/telephony code |
| [paladin-webapp](https://github.com/AshfordBriggs/paladin-webapp) | Recruiter dashboard web application |
| [paladin-docs](https://github.com/AshfordBriggs/paladin-docs) | Documentation, ADRs, infrastructure reference |
| [paladin-internal](https://github.com/AshfordBriggs/paladin-internal) | Business documents |

The source of truth for all infrastructure details (ports, Tailscale hostnames, full server inventory) is `paladin-docs/infrastructure.md`.
