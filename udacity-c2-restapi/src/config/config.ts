const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_DIALECT,
  DB_AWS_REGION,
  DB_AWS_PROFILE,
  DB_AWS_MEDIA_BUCKET,
} = process.env;

export const config = {
  dev: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
    aws_region: DB_AWS_REGION,
    aws_profile: DB_AWS_PROFILE,
    aws_media_bucket: DB_AWS_MEDIA_BUCKET,
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres",
  },
};
