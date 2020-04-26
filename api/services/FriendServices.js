'use strict'


// const modelName1 = 'friend.model'
// const Friend = require(`../models/${modelName1}`)
// const modelName2 = 'user.model'
// const User = require(`../models/${modelName2}`)


const UserServices = require('../services/UserServices');

class FriendServices {
    
    // static async addFriend(UserA, UserB) {
    //     try {
    //         const newComment = new Comment({
    //             content: commentDTO.content,
    //             postId: commentDTO.postId,
    //             author: { id: user.id, username: user.username, avatar: user.avatar },
    //             isActive: true,
    //         })

    //         const docA = await Friend.findOneAndUpdate(
    //             { requester: UserA, recipient: UserB },
    //             { $set: { status: 1 }},
    //             { upsert: true, new: true }
    //         )
    //         const docB = await Friend.findOneAndUpdate(
    //             { recipient: UserA, requester: UserB },
    //             { $set: { status: 2 }},
    //             { upsert: true, new: true }
    //         )
    //         const updateUserA = await User.findOneAndUpdate(
    //             { _id: UserA },
    //             { $push: { friends: docA._id }}
    //         )
            
    //         const updateUserB = await User.findOneAndUpdate(
    //             { _id: UserB },
    //             { $push: { friends: docB._id }}
    //         )
    //         if (!updateUserA || !updateUserB) {
    //             console.log('request fail')
    //             return false
    //           }
    //         return updateUserA && updateUserB;

    //     } catch (error) {
    //         console.log(error)
    //         return false
    //     }
    // }
    // static async acceptFriend(UserA, UserB) {
    //     try {

    //         Friend.findOneAndUpdate(
    //             { requester: UserA, recipient: UserB },
    //             { $set: { status: 3 }}
    //         )
    //         Friend.findOneAndUpdate(
    //             { recipient: UserA, requester: UserB },
    //             { $set: { status: 3 }}
    //         )
    //     } catch (error) {
    //         console.log(error)
    //         return false
    //     }
    // }
    // static async rejectFriend(UserA, UserB) {
    //     try {

    //         const docA = await Friend.findOneAndRemove(
    //             { requester: UserA, recipient: UserB }
    //         )
    //         const docB = await Friend.findOneAndRemove(
    //             { recipient: UserA, requester: UserB }
    //         )
    //         const updateUserA = await User.findOneAndUpdate(
    //             { _id: UserA },
    //             { $pull: { friends: docA._id }}
    //         )
    //         const updateUserB = await User.findOneAndUpdate(
    //             { _id: UserB },
    //             { $pull: { friends: docB._id }}
    //         )
    //         if (!updateUserA || !updateUserB) {
    //             console.log('reject fail')
    //             return false
    //           }
    //         return updateUserA && updateUserB;
    //     } catch (error) {
    //         console.log(error)
    //         return false
    //     }
    // }
    

//another way

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
            const isAccepted = foundUserB.pendingRequests.some((user) => {
                return user._id == userA;
            })

            // If user does not
            if (isAccepted) {
                foundUserA.friends.push(foundUserB);
                foundUserB.friends.push(foundUserA);
                foundUserA.sentRequests.pull(foundUserB);
                foundUserB.pendingRequests.pull(foundUserA);
            }

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
    static async rejectFriend(userA, userB) {
        try {
            var foundUserA = await UserServices.getUser(userA);
            var foundUserB = await UserServices.getUser(userB);

            // Check if user already has same friend
            const isRejected = foundUserB.pendingRequests.some((user) => {
                return user._id == userA;
            })

            // If user does not
            if (isRejected) {
                foundUserA.sentRequests.pull(foundUserB);
                foundUserB.pendingRequests.pull(foundUserA);
            }

        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

}
module.exports = FriendServices
