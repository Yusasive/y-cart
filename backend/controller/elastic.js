const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  cloud: {
    id: "4663c2c4f3974d96ab207ca04bbbac18:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRjYzA2MzMxMTM4YTM0N2I2OWRlMTRjOWI2OTcwOGNiMiQwODljNmIwMjJkMGI0M2YwOGE4MzIwNTg2YmY3YzU5Zg==",
  },
  auth: {
    username: "elastic",
    password: "mxQHPslWwxADrOq4i8LlyW5c",
  },
});
module.exports = client;
