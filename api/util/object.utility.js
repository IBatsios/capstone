/**
 * Object Utility: file for any utility functions regarding JS objects.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class ObjectUtil {

    /**
     * Utility function to test if an object is empty.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static isEmpty(obj) {
        if (Object.keys(obj).length === 0) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ObjectUtil;