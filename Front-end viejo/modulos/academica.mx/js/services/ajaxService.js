/**
 * Created by Porfirio on 24/04/2015.
 */

(function() {
    "use strict";

    var ajaxService = angular.module('ajaxService',[]);

    ajaxService.service('responseTranslate', function() {
        this.doTranslation = function(textToTranslate, translationsArrays) {
            if (translationsArrays[textToTranslate] !== undefined) {
                return translationsArrays[textToTranslate];
            }
            return textToTranslate;
        };
    });

    ajaxService.service('ajaxSender', ['$http', function($http) {
        this.getData = function(url, dataToRequest) {
            if (dataToRequest !== undefined && dataToRequest !== null) {
                return $http.get(url);
            }
            return $http.get(url, dataToRequest);
        };

        this.postData = function(url, dataToSend) {
            return $http.post(url, dataToSend);
        };
    }]);

    ajaxService.service('dataSendService', ['ajaxSender', 'responseTranslate', function($ajax, $translate) {
        var self = this;
        self.messageResponse = null;
        self.senderService = null;

        self.sendData = function(type, url, data) {
            if (type === "post") {
                return $ajax.postData(url, data);
            }
            return $ajax.getData(url);
        };

        self.formatResponse = function(dataToRender, status) {
            if (dataToRender !== undefined) {
                if (status === 422) {
                    self.messageResponse = {
                        responseType: "warning",
                        textMessage: []
                    };
                    angular.forEach(dataToRender, function(value, key) {
                        self.messageResponse.textMessage.push($translate.doTranslation(value, translate));
                    });
                } else if(status === 200) {
                    self.messageResponse = {
                        responseType: dataToRender.type,
                        textMessage: [dataToRender.msg]
                    };
                } else if(status === 500) {
                    self.messageResponse = {
                        responseType: "danger",
                        textMessage: ["Ocurrio un error con el servidor"] //NEcesario insertar los stirng en forma de array
                    };
                } else{
                    self.messageResponse = {
                        responseType: "danger",
                        textMessage: [dataToRender.msg]
                    };
                }

                return self.messageResponse;
            }
        };
    }]);
})();
