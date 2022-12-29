const mongoose = require('mongoose')
require('./customFunctions/contactModel')
const User = mongoose.model('contacts')
const shortid = require('shortid')
//const cookie = require('cookie')

exports.handler = async (event, context) => {
  const array = event.body.split('&')
  const firstName = array[0].split('fname=')
  const lastName = array[1].split('lname=')
  const companyName = array[2].split('cname=')
  const companySize = array[3].split('field=')
  const phone = array[4].split('pnumber=')

  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    const shortIdVariable = shortid.generate()

    const user = await new User({
      referralId: shortIdVariable,
      first_name: firstName[1],
      last_name: lastName[1],
      company_name: companyName[1],
      company_size: companySize[1],
      phone_number: phone[1],
    })

    await user.save()

    return {
      statusCode: 200,
      body: 'Success',
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: err,
    }
  }
}
