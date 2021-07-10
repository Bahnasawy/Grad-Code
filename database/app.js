const express = require("serverless-express/express");
const { postgraphile } = require("postgraphile");
var cors = require("cors");

const { SCHEMA, PG_DEFAULT_ROLE, POSTGRES_CONNECTION } = process.env;

const app = express();
app.use(cors());
app.use(
	postgraphile("postgres://postgres:@192.168.1.111:5432/grad", "public", {
		dynamicJson: true,
		graphqlRoute: "/",
		extendedErrors: ["hint", "detail", "errcode"],
		legacyRelations: "omit",
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
			connectionFilterRelations: true,
		},
		graphiql: true,
		graphiqlRoute: "/graphiql",
	})
);

app.listen(8000, () => console.log(`Server running on port 8000`));
