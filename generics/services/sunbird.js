/**
 * name : sunbird.js
 * author : Vishnudas
 * Date : 07-Mar-2022
 * Description : All Sunbird learner related api call.
 */

//dependencies


const request = require('request');
const sunbirdBaseUrl = process.env.SUNBIRD_SERVICE_URL;
const dataLimit = process.env.SUNBIRD_RESPONSE_DATA_LIMIT ? parseInt(process.env.SUNBIRD_RESPONSE_DATA_LIMIT) : 10000;
const timeout = process.env.SUNBIRD_SERVER_TIMEOUT ? parseInt(process.env.SUNBIRD_SERVER_TIMEOUT) : 5000;

/**
  * 
  * @function
  * @name learnerLocationSearch
  * @param {String} bearerToken - autherization token.
  * @param {object} filterData -  bodydata .
  * @returns {Promise} returns a promise.
*/

const learnerLocationSearch = function ( filterData ) {
  return new Promise(async (resolve, reject) => {
      try {
        
        let bodyData={};
        bodyData["request"] = {};
        bodyData["request"]["filters"] = filterData;
        bodyData["request"]["limit"] = dataLimit;

        const url = 
        sunbirdBaseUrl + messageConstants.endpoints.GET_LOCATION_DATA;
        const options = {
            headers : {
                "Authorization" : process.env.SUNBIRD_SERVICE_AUTHERIZATION,
                "content-type": "application/json"
            },
            json : bodyData
        };

        request.post(url,options,locationSearchCallback);

        let result = {
            success : true
        };

        function locationSearchCallback(err, data) {

            if (err) {
                result.success = false;
            } else {
                  
                let response = data.body;
                  
                if ( response.responseCode === messageConstants.common.OK ) {
                    result["data"] = response.result;
                } else {
                      result.success = false;
                }
            }
            return resolve(result);
        }

        setTimeout( function () {
            return reject (result = {
                success : false
             });
         }, timeout);

      } catch (error) {
          return reject(error);
      }
  })
}


module.exports = {
  learnerLocationSearch : learnerLocationSearch
};