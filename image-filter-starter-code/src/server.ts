import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import { deleteLocalFiles, filterImageFromURL } from "./util/util";
import { config } from "./config/config";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization) {
      return res.status(401).send({ message: "No authorization headers." });
    }

    const token_bearer = req.headers.authorization.split(" ");
    if (token_bearer.length != 2) {
      return res.status(401).send({ message: "Malformed token." });
    }

    const token = token_bearer[1];

    return jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate." });
      }
      return next();
    });
  }

  app
    .route("/filteredimage")
    .all(requireAuth)
    .get(async function getFilteredImage(req: Request, res: Response) {
      const { image_url } = req.query;
      if (!image_url) {
        return res.status(400).send("Image Url is required.");
      }
      try {
        const filePath: string = await filterImageFromURL(image_url);
        res.status(200).sendFile(filePath, (error: Error) => {
          deleteLocalFiles([filePath]);
        });
      } catch (error) {
        res.status(500).send(new Error("Internal Server Error"));
      }
    });

  // ! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
