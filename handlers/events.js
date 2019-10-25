const requireAll = require('require-all');   // Don't forget to install!

const files = requireAll({                   // Require all the files within your
  dirname: `${__dirname}/events`,            // event directory which have a name
  filter: /^(?!-)(.+)\.js$/                  // ending in '.js' NOT starting
});                                          // with '-' (a way to disable files).

client.removeAllListeners();                 // Prevent duplicate listeners on reload.

for (const name in files) {                  // Iterate through the files object
  const event = files[name];                 // and attach listeners to each
                                             // event, passing 'client' as the
  client.on(name, event.bind(null, client)); // first parameter, and the rest
                                             // of the expected parameters
  console.log(`Event loaded: ${name}`);      // afterwards. Then, log the
}    