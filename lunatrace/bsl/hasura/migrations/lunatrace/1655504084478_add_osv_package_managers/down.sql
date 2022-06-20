-- Down migration is not possible, we are adding values to an existing enum. Going down would cause errors for data that
-- depend on these types to exist
SELECT null;
