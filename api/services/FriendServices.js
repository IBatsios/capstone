'use strict'
const UserServices = require('../services/UserServices');

class FriendServices {
    static async friendRequest(userA, userB) {
        try {
            var foundUserA = await UserServices.getUser(userA);
            var foundUserB = await UserServices.getUser(userB);

            // Check if user already has same friend
            const isFriend = foundUserA.friends.some((user) => {
                return user._id == userB;
            })

            // If user does not
            if (!isFriend) {
                foundUserA.sentRequests.push(foundUserB);
                foundUserB.pendingRequests.push(foundUserA);
            }

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    static async acceptFriend(userA, userB) {
        try {
            var foundUserA = await UserServices.getUser(userA);
            var foundUserB = await UserServices.getUser(userB);

            // Check if user already has same friend
            const isFriend = foundUserB.friends.some((user) => {
                return user._id == userA;
            })

            // If user does not
            if (!isFriend) {
                foundUserA.friends.push(foundUserB);
                foundUserB.friends.push(foundUserA);
                foundUserA.sentRequest.pull(foundUserB);
                foundUserB.pendingRequests.pull(foundUserA);
            }

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

}
module.exports = FriendServices
