export const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const namePattern = /^[a-z ,.'-]+$/i
// International phone pattern: allows optional +, country code (1-4 digits), and number (with spaces/dashes/dots)
// Minimum 7 digits, maximum 15 digits (ITU-T E.164 standard)
export const phonePattern = /^\+?[0-9]{1,4}[-.\s]?(?:[0-9][-.\s]?){6,14}$/
export const altPhonePattern = /^\+?[0-9]{1,4}[-.\s]?(?:[0-9][-.\s]?){6,14}$/