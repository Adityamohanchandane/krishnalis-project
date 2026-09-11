// @ts-nocheck - firebase-admin has built-in types but TS has issues detecting them
import * as admin from 'firebase-admin';

let adminApp: any = null;
let dbInstance: any = null;
let authInstance: any = null;

function initializeAdmin() {
  if (adminApp) return adminApp;

  try {
    if (typeof window === 'undefined' && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      if (!admin.apps || admin.apps.length === 0) {
        adminApp = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        adminApp = admin.apps[0];
      }
    }
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
  
  return adminApp;
}

export function getAdminDb() {
  if (!dbInstance) {
    const app = initializeAdmin();
    if (app) {
      dbInstance = admin.firestore();
    }
  }
  return dbInstance;
}

export function getAdminAuth() {
  if (!authInstance) {
    const app = initializeAdmin();
    if (app) {
      authInstance = admin.auth();
    }
  }
  return authInstance;
}

// For backward compatibility
export const adminDb = getAdminDb();
export const adminAuth = getAdminAuth();
