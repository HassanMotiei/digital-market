const testEmail = (value) => {
  const emailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  return emailPattern.test(value)
}

const testCodePassport = (value) => {
  // Test code passport
}

const testPhoneNumber = (value) => {
  // Test phone number
}

export default {
  testEmail,
  testCodePassport,
  testPhoneNumber,
}
