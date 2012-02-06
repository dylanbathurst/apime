function set(name, value) {
  if (!(name in process.env)) {
    process.env[name] = value;
  }
}


// ---------------------- //
// --  Server Settings -- //
// ---------------------- //

// The port for the HTTP server to listen on
set('PORT', 8000);

// The environment type
set('NODE_ENV', 'development');

// The API to use
set('DB', '127.0.0.1');
