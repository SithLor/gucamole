class ValidateAppFromServer {
    constructor(params) {
        if (params.hasOwnProperty("validationUrl") && params.validationUrl.length > 0) {
            this.url = params.validationUrl;
            if (!this.url.endsWith("/")) {
                this.url += "/";
            }
            
            this.url += params.appId;
        }
        else if (params.hasOwnProperty("apiServer") && params.apiServer.length > 0) {
            this.url = params.apiServer;
            if (!this.url.endsWith("/")) {
                this.url += "/";
            }

            this.url += "0/lsa/lanschool/clientInstaller/chrome/" + params.appId + "/validate";
        }
    }

    checkApp() {
        let self = this;
        return new Promise((resolve, reject) => {
            let myUrl = new URL(self.url);
            let validateCall = new XMLHttpRequest();
            validateCall.onreadystatechange = function() {
                if (validateCall.readyState === XMLHttpRequest.DONE) {
                    if (validateCall.status === 200) {
                        resolve({ valid: true });
                    }
                    else {
                        reject(validateCall.status);
                    }
                }
            }

            validateCall.open('GET', myUrl, true);
            validateCall.setRequestHeader("Content-type", "application/json");
            validateCall.send();
        });
    }
}