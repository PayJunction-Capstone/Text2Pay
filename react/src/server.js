import express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";

var MongoDBStore = require("connect-mongodb-session")(session);

var server = new ApolloServer({
  typeDefs: [rootSchema, ...schemaTypes],
  resolvers: merge({}, user, deck, card),
  context(req) {
    return { ...req.req };
  }
});

var app = express();

var store = new MongoDBStore({
  uri: config.DB_URI,
  collection: "sessions"
});

store.on("error", function(error) {
  console.log(error);
});

app.use(
  session({
    name: config.SESS_NAME,
    secret: config.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "production",
      maxAge: config.SESS_LIFETIME
    },
    store: store
  })
);

var corsOptions = {
  origin: ["http://localhost:3000", serverUrl],
  credentials: true
};

app.use(cors(corsOptions));

server.applyMiddleware({ app, cors: false });

async function login(_, args, ctx) {
  if (isAuthenticated(ctx.session)) {
    throw new ForbiddenError("User already authenticated");
  }
  try {
    return await loginUser(
      args.input.username,
      args.input.password,
      ctx.session
    );
  } catch (err) {
    throw err;
  }
}

async function logout(_, args, ctx) {
  if (!isAuthenticated(ctx.session)) {
    throw new AuthenticationError("User not authenticated");
  }
  return await logoutUser(ctx);
}


function isAuthenticated(session) {
  return session.user != undefined;
}

async function loginUser(username, password, session) {
  if (isValidUsername && isValidPassword) {
    var user = await User.findOne({ username });
    if (user != null && (await user.checkPassword(password))) {
      session.user = {
        _id: user._id,
        username: user.username
      };
      return session.user;
    }
  }
  throw new UserInputError("Invalid username or password.");
}

async function logoutUser(ctx) {
  var loggedOutUser = ctx.session.user;
  await ctx.session.destroy();
  ctx.res.clearCookie(SESS_NAME);
  return loggedOutUser;
}