const express = require("serverless-express/express");
const { postgraphile } = require("postgraphile");
var cors = require("cors");

const { SCHEMA, PG_DEFAULT_ROLE, POSTGRES_CONNECTION } = process.env;
// console.log(ManyPlugin.default());

const app = express();
app.use(
	postgraphile("postgres://postgres:@localhost:5432/grad", "public", {
		// options
		dynamicJson: true,
		// disableQueryLog: isProduction,
		graphqlRoute: "/",
		extendedErrors: ["hint", "detail", "errcode"],
		// jwtSecret: '',
		// jwtPgTypeIdentifier: '',
		legacyRelations: "omit",
		// readCache: "introspection.cache",
		pgDefaultRole: PG_DEFAULT_ROLE,
		subscriptions: true,
		setofFunctionsContainNulls: false,
		ignoreRBAC: false,
		appendPlugins: [
			require("@graphile-contrib/pg-simplify-inflector"),
			require("postgraphile-plugin-connection-filter"),
			require("postgraphile-plugin-many-create-update-delete").default,
		],
		retryOnInitFail: true,
		graphileBuildOptions: {
			connectionFilterRelations: true, // default: false
		},
		graphiql: true,
		graphiqlRoute: "/graphiql",
	})
);

// module.exports = app;

app.listen(8000);
