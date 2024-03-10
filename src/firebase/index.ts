import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'
import { ENV } from '../conf'

const firebaseConfig = {
  databaseURL: ENV.VITE_FIREBASE_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const cat = ref(database, 'Category')
