# AA Technology Solutions Static Website

A simple HTML, CSS, and JavaScript website for **AA Technology Solutions**.

## Files

- `index.html` - website content and sections
- `styles.css` - responsive design and styling
- `script.js` - service rate filtering, FAQ toggle, and booking form email sending
- `vercel.json` - clean URL configuration for Vercel

## What Changed

- Updated the full website branding to **AA Technology Solutions**.
- Updated the booking form button to **Send Booking Request**.
- Added Web3Forms support so booking requests can be sent directly to your email.
- Added fallback buttons to copy the booking message or send it manually through email.

## Edit Before Deploying

Open `index.html` and replace these placeholders:

- `0900 000 0000`
- `https://facebook.com/`

Your email is currently set to:

```text
patiuaaron@gmail.com
```

Change it in both `index.html` and `script.js` if you want to use a separate business email.

## Connect Booking Form to Email

This project uses Web3Forms because it works with static HTML/CSS/JS websites and does not need a backend server.

### Steps

1. Go to `https://web3forms.com/`.
2. Click **Create Access Key**.
3. Enter the email where you want to receive booking requests.
4. Copy the access key sent to your email.
5. Open `script.js`.
6. Replace this line:

```js
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
```

with your real key:

```js
const WEB3FORMS_ACCESS_KEY = "paste-your-real-key-here";
```

7. Save, deploy, then test the form.

## Deploy on Vercel

### Option 1: GitHub + Vercel Dashboard

1. Create a GitHub repository named `aa-technology-solutions`.
2. Upload these files to the repository root.
3. Go to Vercel and choose **Add New Project**.
4. Import your GitHub repository.
5. Framework Preset: **Other**.
6. Build Command: leave empty / no build step.
7. Deploy.

### Option 2: Vercel CLI

From the project folder:

```bash
npm i -g vercel
vercel
vercel --prod
```

This project is static, so it does not need React, Node.js, or a build command.
