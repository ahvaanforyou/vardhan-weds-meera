# Wedding RSVP Google Sheets setup

The Apps Script project uses `Code.gs`. The spreadsheet stays private in the Google account that runs `setupWeddingRSVP()`; the web app runs as that owner and appends rows on its behalf.

## Create the spreadsheet

1. Open [script.google.com](https://script.google.com/) and create a standalone Apps Script project.
2. Replace the starter code with the contents of `Code.gs` and save.
3. Select and run `setupWeddingRSVP()`. Review and grant the requested Google Sheets/Drive authorization.
4. Open the execution log to get the spreadsheet URL. The script creates `vardhan-weds-meera-RSVPs`, the `RSVP Responses` tab, its header row and formatting. It stores the spreadsheet ID and a proxy token in Script Properties. Running setup again reuses the saved spreadsheet and never clears response rows.
5. In **Project Settings → Script Properties**, copy the value of `RSVP_PROXY_TOKEN`. Keep it private.

## Deploy the endpoint

1. In Apps Script, choose **Deploy → New deployment → Web app**.
2. Set **Execute as** to your account (the spreadsheet owner).
3. Set **Who has access** to **Anyone**, then deploy and authorize if prompted. The public web-app URL is required for server-to-server submission. The spreadsheet itself remains private.
4. Copy the deployed URL ending in `/exec`.

## Current invitation status

The active invitation no longer includes an RSVP form and does not submit responses to this Apps Script project. The script remains available for reuse. If you connect another frontend later, send submissions through a server-side proxy that keeps the token private; do not put the token in browser code or use a `NEXT_PUBLIC_` variable.

## Verify responses

Submit one **Joyfully Accepts** test with at least one ceremony selected and one **Regretfully Declines** test. Confirm each appears as a separate row in `RSVP Responses`, with the expected guest count, ceremony names, and message. Remove test rows manually if desired.

The public form has input limits, same-origin checks, a hidden honeypot, and a server-only token. A public RSVP form cannot prove a guest's identity or prevent a determined bot from imitating a browser request; monitor responses and redeploy/rotate the proxy token if it is exposed.
