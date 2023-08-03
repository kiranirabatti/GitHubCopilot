// Create web server application with Node.js
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// Handle HTTP requests
function handle_incoming_request(req, res) {
    req.parsed_url = url.parse(req.url, true);
    const core_url = req.parsed_url.pathname;
    return handle_request(core_url, req, res);
}

function handle_request(core_url, req, res) {
    core_url = core_url.replace(/^\/+|\/+$/g, "");
    const action = req.parsed_url.query.action;
    if (action == null) {
        send_failure(res, 400, invalid_request(core_url, "No action specified"));
        return;
    }
    if (action == "list") {
        handle_list_action(core_url, req, res);
    }
    else if (action == "add") {
        handle_add_action(core_url, req, res);
    }
    else {
        send_failure(res, 400, invalid_request(core_url, "Unknown action"));
    }
}