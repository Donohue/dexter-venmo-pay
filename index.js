var rest = require('restler');
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var username = step.input('username').first();
        var amount = step.input('amount').first();
        var note = step.input('note').first();
        var access_token = dexter.environment('venmo_access_token');

        if (username == undefined || !username.length) {
            return this.fail({'message': 'Invalid username'});
        }
        else if (amount == undefined || isNaN(amount)) {
            this.log(amount);
            return this.fail({'message': 'Invalid amount'});
        }
        else if (note == undefined || !note.length) {
            return this.fail({'message': 'Invalid note'});
        }
        else if (access_token == undefined || !access_token.length) {
            return this.fail({'message': 'Invalid access token'});
        }

        var self = this;
        var postData = {
            data: {
                username: step.input('username').first(),
                amount: step.input('amount').first(),
                note: step.input('note').first(),
                access_token: dexter.environment('venmo_access_token')
            }
        };

        rest.post('https://api.venmo.com/v1/payments', postData).on('complete', function(result, response) {
            if (response.statusCode != 200) {
                return self.fail({
                    statusCode: response.statusCode,
                    headers: response.headers,
                    data: result,
                    message: 'Payment failed. Invalid status code: ' + response.statusCode
                });
            }

            self.complete({});
        });
    }
};
