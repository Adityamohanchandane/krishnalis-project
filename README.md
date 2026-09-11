# Student Attendance System

A Next.js-based student attendance tracking system with admin dashboard, student portal, QR code scanner, and Firebase authentication.

## Features

- **Admin Dashboard**: Overview of attendance statistics, weekly trends, and real-time check-ins
- **Student Portal**: Personal dashboard with attendance history and QR code scanning
- **QR Code Attendance**: Secure check-in system with location verification
- **Firebase Integration**: Authentication and Firestore database
- **Real-time Updates**: Live attendance tracking and notifications
- **Responsive Design**: Mobile-friendly interface with 3D background effects

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **3D Graphics**: React Three Fiber, Three.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Charts**: Recharts
- **QR Code**: ZXing Library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up with Firestore and Authentication enabled
- Firebase service account credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Adityamohanchandane/krishnalis-project.git
cd krishnalis-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Firebase credentials in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Firebase Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Firestore Database
- Enable Authentication (Email/Password provider)

### 2. Get Firebase Configuration
- Go to Project Settings → General → Your apps
- Copy the Firebase configuration values
- Add them to your `.env.local` file

### 3. Create Service Account
- Go to Project Settings → Service accounts
- Click "Generate new private key"
- Save the JSON file securely
- Copy the `client_email`, `private_key`, and `project_id` to your environment variables

### 4. Set Up Firestore Collections
Create the following collections in Firestore:

**students** collection:
```json
{
  "fullName": "John Doe",
  "studentId": "STU001",
  "className": "10-A",
  "division": "A",
  "identityToken": "unique_token_here",
  "status": true
}
```

**campus** collection:
```json
{
  "name": "Main Campus",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "allowedRadius": 100,
  "status": true
}
```

**attendance** collection (auto-created by API):
```json
{
  "studentId": "student_document_id",
  "attendanceDate": "2024-01-15T10:30:00.000Z",
  "checkInTime": "2024-01-15T10:30:00.000Z",
  "status": "PRESENT",
  "verificationMethod": "QR_CODE",
  "locationVerified": true,
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

## Deploy on Render

### Prerequisites
- Render account
- GitHub repository connected to Render
- Environment variables configured in Render

### Deployment Steps

1. **Connect GitHub Repository**
   - Log in to [Render](https://render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Name**: student-attendance-app
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

3. **Add Environment Variables**
   Add the following environment variables in Render dashboard:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   FIREBASE_PROJECT_ID
   FIREBASE_CLIENT_EMAIL
   FIREBASE_PRIVATE_KEY
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for the deployment to complete

5. **Access Your App**
   - Once deployed, Render will provide a URL
   - Your app will be live at `https://your-app-name.onrender.com`

### Alternative: Using render.yaml
The project includes a `render.yaml` configuration file. You can also deploy by:
1. Pushing your code to GitHub
2. In Render, create a new blueprint from your repository
3. Render will automatically use the `render.yaml` configuration

## Build and Production

### Build locally
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Lint code
```bash
npm run lint
```

## Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard pages
│   ├── api/                # API routes
│   ├── student/            # Student portal pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── providers/          # Context providers
│   ├── Scanner.tsx         # QR code scanner
│   └── 3d/                 # 3D background components
├── lib/
│   ├── firebase.ts         # Firebase client config
│   └── firebase-admin.ts   # Firebase admin config
└── public/                 # Static assets
```

## Troubleshooting

### Firebase Configuration Errors
- Ensure all environment variables are set correctly
- Check that your Firebase project has Firestore and Authentication enabled
- Verify the service account credentials are valid

### Build Errors
- Ensure Node.js version is 18 or higher
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check that all dependencies are compatible with Next.js 16

### Deployment Issues
- Verify environment variables are set in Render dashboard
- Check Render build logs for specific errors
- Ensure Firebase rules allow read/write access from your deployed domain

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
