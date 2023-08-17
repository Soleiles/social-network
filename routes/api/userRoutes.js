// Calls all functions from userController
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// Manages all user functions
router.route('/').get(getUsers).post(createUser);
router 
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Manages friend functions
router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;