# Connect the contact form to Google Sheets

Submissions from **Book The Fifth Sense** are sent to a Google Sheet via a small **Google Apps Script** web app.

## 1. Create the spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet (e.g. “TFS Contact Form”).
2. In **row 1**, set headers (exact order helps when reading the sheet):

   | A           | B    | C     | D     | E          | F       |
   |-------------|------|-------|-------|------------|---------|
   | Timestamp   | Name | Email | Phone | Event Date | Message |

3. Keep this tab as the **first sheet** (leftmost), or adjust `getSheets()[0]` in the script if you use another tab.

## 2. Add the Apps Script

1. In the sheet: **Extensions → Apps Script**.
2. Delete any code in `Code.gs` and paste the contents of **`docs/google-apps-script-ContactSheet.gs`** from this repo.
3. Set **`EXPECTED_SECRET`** in that file to a long random string (same value you’ll put in `.env` as `VITE_GOOGLE_FORM_SECRET`).  
   - To skip the check while testing, set `EXPECTED_SECRET` to `''` (empty string) and leave `VITE_GOOGLE_FORM_SECRET` unset—**not recommended for production**.
4. **Save** the project (Ctrl/Cmd + S).

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear **Select type → Web app**.
3. **Execute as:** Me  
4. **Who has access:** **Anyone** (required so visitors can submit from your website without signing in).
5. **Deploy**, authorize when prompted, then **copy the Web app URL** (ends with `/exec`).

## 4. Configure the website

1. Copy `.env.example` to `.env` in the project root.
2. Set:

   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
   VITE_GOOGLE_FORM_SECRET=the-same-secret-as-in-Apps-Script
   ```

3. Restart `pnpm dev` / `npm run dev` after changing `.env`.

## 5. Test

Submit the form on your site, then refresh the sheet—you should see a new row.

### Troubleshooting

- **Nothing appears in the sheet:** Check **Executions** in Apps Script (clock icon) for errors. Confirm deployment is **New deployment** after code changes (or use **Manage deployments → Edit → Version**).
- **CORS errors in the browser console:** Try another browser or an incognito window; ensure the URL is the **`/exec`** link from **Deploy**, not the editor URL.
- **Spam:** Keep `EXPECTED_SECRET` set and never commit `.env`. For stronger protection, add a server or Turnstile/reCAPTCHA later.
