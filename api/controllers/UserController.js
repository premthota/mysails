module.exports = {
/**
* It will create a new user .
*/
create: function (req, res) {
let firstName = req.param('firstname'),
lastName = req.param('lastname');
if(!firstName){
return res.badRequest({err:'Invalid first_name'});
}
if(!lastName){
return res.badRequest({err:'Invlaid last_name'});
}
User.create({
firstname : firstName,
lastname : lastName,
})
.then(_user => {
if(!_user) return res.serverError({err: 'User created '});
return res.ok(_user);
})
.catch(err => res.serverError(err.message));
},


/**
* This method will update the user
*/

update: function (req, res) {
let firstName = req.param(`firstname`),
lastName = req.param(`lastname`),
userId = req.params.id;
if (!userId) return res.badRequest({ err: `user id is missing` });
let user = {};
if (firstName) {
user.firstname = firstName;
}
if (lastName) {
user.lastname = lastName;
}
User.update({ id: userId }, user)
.then(_user => {
if (!_user[0] || _user[0].length === 0) return res.notFound({ err: `No user found `});
return res.ok(_user[0]);
}).catch(err => res.serverError(err));

} ,


/**
* This method will delete the post
*/
delete: function (req, res) {
let userId = req.params.id;
if (!userId) return res.badRequest({ err: `missing user_id field` });
User.destroy({ id: userId })
.then(_user => {
if (!_user || _user.length === 0) return res.notFound({ err: `No user found in our record` });
return res.ok({msg:`User is deleted with id ${userId}`});
})
.catch(err => res.serverError(err));
},


/**
* Find all the posts with category and user
*/

findAll: function (req, res) {
User.find()
.populate(`id`)
.then(_users => {
if (!_users || _users.length === 0) {
throw new Error(`No user found`);
}
return res.ok(_users);
})
.catch(err => res.serverError(err));
},

/**
* find single post based on id
*/
findOne: function (req, res) {
let userId = req.params.id;
if (!userId) return res.badRequest({ err: `missing user_id field` });
User.findOne({ id: userId })
.populate(`user`)
.then(_user => {
if (!_user) return res.notFound({ err: `No user found` });
return res.ok(_user);
})
.catch(err => res.serverError(err));
}

};