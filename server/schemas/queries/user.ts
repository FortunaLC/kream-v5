import { profileFields } from './profile'

// all fields that are seen on the profile page plus private info
// and settings from the user
// gets sanitized through the transformUserData function (removing password etc...)
export const userFields = [...profileFields, 'email', 'password']
