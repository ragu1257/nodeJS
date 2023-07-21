const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req,res)=>{
  const contacts = await Contact.find({user_id: req.user.id})
  res.status(200)
  res.json(contacts);
})

//@desc create  contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req,res)=>{
 const {name, email, phone} = req.body
 console.log(req.body);
  if(!name || !email || !phone){
    res.status(400)
    throw new Error("ALl Fields are mandatory !")
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  })
  res.status(201)
  res.json(contact);
})

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const updateContact = asyncHandler( async(req,res)=>{
  const contact = Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("Contact not found")
  }
  console.log(contact, req.params.id, req.body, req.user.id);
  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("YOu are not authorized")
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  );

  res.status(200)
  res.json(updatedContact);
})

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const deleteContact = asyncHandler (async(req,res)=>{
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("Contact not found")
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("YOu are not authorized")
  }
  await Contact.remove()
  res.status(200)
  res.json(contact);
})

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler (async(req,res)=>{
  const contact = await Contact.findById(req.params.id)
  if(!contact){
    res.status(404)
    throw new Error("contact not found")
  }
  res.status(200)
  res.json(contact);
})

module.exports = {getContacts, createContact, updateContact,deleteContact,getContact}