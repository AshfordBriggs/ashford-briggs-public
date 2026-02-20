# Ashford & Briggs Public Website

Product marketing site for **Paladin Veritai** — a real-time AI intelligence platform for recruiting calls.

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
# One-liner: push and deploy
git push origin master && sshpass -p '$boating1' ssh mbarker@10.0.0.80 'echo '"'"'$boating1'"'"' | sudo -S git -C /var/www/html/ashford-briggs-public pull origin master'
```

> **Note:** sudo requires the password piped via `-S` flag since there is no interactive terminal.
> After deploying CSS changes, a hard refresh (`Ctrl+Shift+R`) may be needed due to browser caching.

## Local Preview

```bash
python3 -m http.server 8000 --directory /home/mbarker/ashford-briggs-public
```

Preview at `http://localhost:8000`.

## Product Context

- **Product name:** Paladin Veritai (formerly "Paladin Veritai Agent" — "Agent" was dropped)
- **Company:** Ashford & Briggs — a recruiting technology company (no longer offers staffing services)
- **Target audience:** Individual recruiters and staffing agencies — not just enterprise teams
- **Key messaging themes:**
  - Uses your own phone — no app required
  - Human connection preserved — call is transparent to the candidate
  - Counter-intelligence against AI-assisted candidate deception
  - Pre-call skills gap analysis, live prompts during the call, post-call summary with confidence scores
- **Competitive advantage (keep vague on public site):** Culture profiling methodology and personality assessment details — reference outcomes (confidence score, culture fit) but not how they're determined
- **Site sections (current order):** Hero → Problem (stats) → Market Context ("Candidates Have AI") → Solution (4 cards) → How It Works (4 steps) → Why Us → Team → Contact

## Related Paladin Repos

| Repo | Contents |
|------|----------|
| [paladin-pbx](https://github.com/AshfordBriggs/paladin-pbx) | Server-side PBX/telephony code |
| [paladin-webapp](https://github.com/AshfordBriggs/paladin-webapp) | Recruiter dashboard web application |
| [paladin-docs](https://github.com/AshfordBriggs/paladin-docs) | Documentation, ADRs, infrastructure reference |
| [paladin-internal](https://github.com/AshfordBriggs/paladin-internal) | Business documents |

The source of truth for all infrastructure details (ports, Tailscale hostnames, full server inventory) is `paladin-docs/infrastructure.md`.
