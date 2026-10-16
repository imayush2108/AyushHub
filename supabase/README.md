# Ayush Hub — Secure Supabase Admin Authentication Setup

This guide walks you through connecting your Supabase project to activate and secure the Ayush Hub Admin Panel.

---

## 1. Create Your Free Supabase Project

1. Visit [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**, choose an organization, and give your project a name (e.g. `ayush-hub`).
3. Set a strong database password and select the region closest to your audience (e.g. `ap-south-1` Mumbai / India).
4. Wait ~2 minutes for the database to provision.

---

## 2. Run the Security Database Setup Script

1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Click **New Query**.
3. Copy the entire contents of [`supabase/schema.sql`](./schema.sql) and paste it into the editor.
4. Click **Run** (or press `Ctrl+Enter`).
5. You should see a `Success: No rows returned` message. This sets up:
   - `admin_profiles` table
   - The `is_admin()` cryptographic security function
   - Row Level Security (RLS) policies for songs, movies, and collaborations

---

## 3. Create & Authorize Your Personal Administrator Account

### A. Create Your Account
1. In the Supabase Dashboard, go to **Authentication > Users**.
2. Click **Add User > Create User**.
3. Enter your **personal email address** and a **strong password**.
4. Check **"Auto Confirm User?"** so you can log in immediately without waiting for an email confirmation link.
5. Click **Create User**.

### B. Disable Public Signups (Maximum Security)
1. Go to **Authentication > Providers > Email**.
2. Turn **OFF** the switch for **"Allow new users to sign up"**.
3. Click **Save**.
   > This ensures that random public visitors cannot register an account on your website. Only accounts you create inside your Supabase dashboard can ever log in!

### C. Grant SuperAdmin Clearance
1. In **Authentication > Users**, find your newly created user row and copy the **User UID** (looks like `8f7b3c21-4d5a-6b7c-8d9e-0f1a2b3c4d5e`).
2. Go back to the **SQL Editor > New Query** and run:

```sql
-- Replace with your actual User UID (make sure to remove the angle brackets < >)
INSERT INTO public.admin_profiles (id, email, role)
VALUES ('PASTE_YOUR_COPIED_USER_UID_HERE', 'your-email@domain.com', 'superadmin')
ON CONFLICT (id) DO UPDATE SET role = 'superadmin';
```

---

## 4. Connect Environment Variables

### A. Local Development
1. In the Supabase Dashboard, navigate to **Project Settings > API**.
2. Copy the **Project URL** and the **anon / public** API key.
3. In your project root, create a file named `.env.local` (this file is ignored by git and never committed):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### B. GitHub Pages (Production Deployment)
1. In your GitHub repository (`AyushHub`), go to **Settings > Secrets and variables > Actions**.
2. Under **Repository secrets**, click **New repository secret**:
   - Name: `VITE_SUPABASE_URL`, Value: your Supabase Project URL
   - Name: `VITE_SUPABASE_ANON_KEY`, Value: your Supabase `anon` public key
3. The next time you push to `main` (or run the workflow manually), GitHub Actions will securely compile these variables into the GitHub Pages build!

---

## 5. Security Summary

| Feature | Ayush Hub Implementation |
|---|---|
| **Route Protection** | Private Admin Panel content is completely unmounted until token verification succeeds |
| **Passwords** | Never stored in frontend, local storage, or public repositories; handled by Supabase bcrypt / Argon2 |
| **Session Persistence** | Automatic 256-bit encrypted JWT refresh with explicit expiration handling |
| **Authorization** | Verified via database Row Level Security (`admin_profiles` table & `is_admin()`) |
| **Public Signups** | Disabled in Supabase Auth to prevent unauthorized visitors from creating accounts |
| **Secrets Exposure** | Public `anon` key only; `service_role` secret key is never used in the frontend |
