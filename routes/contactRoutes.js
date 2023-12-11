const express=require("express");
const router=express.Router();
const {
    getContact,
    deleteContact,
    getAllContacts,
    updateContact,
    createContact,

}=require("../Controllers/contactController")


//get all contacts
router.route("/").get(getAllContacts)

//create route
router.route("/").post(createContact)


//Update route
router.route("/:id").put(updateContact)



//Get route 
router.route("/:id").get(getContact)



//Delete Route

router.route("/:id").delete(deleteContact)





module.exports=router;