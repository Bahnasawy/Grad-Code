export $(egrep -v '^#' .env | xargs)

echo "Creating introspection cache"

postgraphile -c $POSTGRES_CONNECTION \
  -s $SCHEMA \
  --write-cache "introspection.cache" \
  --append-plugins postgraphile-plugin-connection-filter,postgraphile-plugin-many-create-update-delete,@graphile-contrib/pg-simplify-inflector \
  --no-server