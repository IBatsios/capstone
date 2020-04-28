'use strict'

const UserServices = require('../services/UserServices');

class FriendServices {

    static async friendRequest(sendingUser, receivingUser) {
        try {
            
            var foundsendingUser = await UserServices.getUser(sendingUser);
            var foundreceivingUser = await UserServices.getUser(receivingUser);

            // Check if user already has same friend
            const isAlreadyFriend = foundsendingUser.friends.some((user) => {
                return user._id == receivingUser;
            })
            const isAlreadyRequest = foundsendingUser.sentRequests.some((user) => {
                return user._id == receivingUser;
            })
            const isPending = foundreceivingUser.pendingRequests.some((user) => {
                return user._id == sendingUser;
            })

            // If user does not
            if (!isAlreadyFriend && !isAlreadyRequest && !isPending) {
                foundsendingUser.sentRequests.push(foundreceivingUser);
                foundreceivingUser.pendingRequests.push(foundsendingUser);
                try {
                    var updatedsendingUser = await UserServices.updateUser(sendingUser, foundsendingUser);
                    var updatedreceivingUser = await UserServices.updateUser(receivingUser, foundreceivingUser);
                    if (updatedsendingUser && updatedreceivingUser ) {
                        console.log(`Friend sent: ${updatedsendingUser && updatedreceivingUser}`);
                        
                        
                    } else {
                    console.log('Friend not sent');
                    return false;
                    }
                } catch (error) {
                    console.log(error.message);
                    return false;
                }
                return updatedsendingUser && updatedreceivingUser
            }
            return false
           

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    static async acceptFriend(sendingUser, receivingUser) {
        try {
            var foundsendingUser = await UserServices.getUser(sendingUser);
            var foundreceivingUser = await UserServices.getUser(receivingUser);

            // Check if user already has same friend
            const isAlreadyFriend = foundreceivingUser.friends.some((user) => {
                return user._id == sendingUser;
            })
            const isRequested = foundreceivingUser.pendingRequests.some((user) => {
                return user._id == sendingUser;
            })

            // If user does not
            if (!isAlreadyFriend && isRequested) {
                foundsendingUser.friends.push(foundreceivingUser);
                foundreceivingUser.friends.push(foundsendingUser);
                foundsendingUser.sentRequests.pull(foundreceivingUser);
                foundreceivingUser.pendingRequests.pull(foundsendingUser);
                try {
                    var updatedsendingUser = await UserServices.updateUser(sendingUser, foundsendingUser);
                    var updatedreceivingUser = await UserServices.updateUser(receivingUser, foundreceivingUser);
                    if (updatedsendingUser && updatedreceivingUser ) {
                        console.log(`accepted: ${updatedsendingUser && updatedreceivingUser}`);
                        
                    } else{
                    console.log('not accepted');
                    return false;
                    }
                } catch (error) {
                    console.log(error.message);
                    return false;
                }
                return updatedsendingUser && updatedreceivingUser
            }
            return false
            

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
    static async rejectFriend(sendingUser, receivingUser) {
        try {
            var foundsendingUser = await UserServices.getUser(sendingUser);
            var foundreceivingUser = await UserServices.getUser(receivingUser);

            // Check if user already has same friend
            const isAlreadyFriend = foundreceivingUser.friends.some((user) => {
                return user._id == sendingUser;
            })
            const isRequested = foundreceivingUser.pendingRequests.some((user) => {
                return user._id == sendingUser;
            })

            // If user does not
            if (!isAlreadyFriend && isRequested) {
                foundsendingUser.sentRequests.pull(foundreceivingUser);
                foundreceivingUser.pendingRequests.pull(foundsendingUser);
                try {
                    var updatedsendingUser = await UserServices.updateUser(sendingUser, foundsendingUser);
                    var updatedreceivingUser = await UserServices.updateUser(receivingUser, foundreceivingUser);
                    if (updatedsendingUser && updatedreceivingUser ) {
                        console.log(`rejected: ${updatedsendingUser && updatedreceivingUser}`);
                        
                    } else{
                    console.log('not rejected');
                    return false;
                    }
                } catch (error) {
                    console.log(error.message);
                    return false;
                }
                return updatedsendingUser && updatedreceivingUser
            }
            return false

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
    static async cancelRequest(sendingUser, receivingUser) {
        try {
            var foundsendingUser = await UserServices.getUser(sendingUser);
            var foundreceivingUser = await UserServices.getUser(receivingUser);

            // Check if user already has same friend
            const isAlreadyFriend = foundreceivingUser.friends.some((user) => {
                return user._id == sendingUser;
            })
            const isAlreadyRequest = foundsendingUser.sentRequests.some((user) => {
                return user._id == receivingUser;
            })

            // If user does not
            if (!isAlreadyFriend && isAlreadyRequest) {
                foundsendingUser.sentRequests.pull(foundreceivingUser);
                foundreceivingUser.pendingRequests.pull(foundsendingUser);
                try {
                    var updatedsendingUser = await UserServices.updateUser(sendingUser, foundsendingUser);
                    var updatedreceivingUser = await UserServices.updateUser(receivingUser, foundreceivingUser);
                    if (updatedsendingUser && updatedreceivingUser ) {
                        console.log(`rejected: ${updatedsendingUser && updatedreceivingUser}`);
                        
                    } else{
                    console.log('not rejected');
                    return false;
                    }
                } catch (error) {
                    console.log(error.message);
                    return false;
                }
                return updatedsendingUser && updatedreceivingUser
            }
            return false

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
    

}
module.exports = FriendServices
