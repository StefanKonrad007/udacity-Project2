import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, isUrl } from './util/util';
import fs from 'fs';
import {Request, Response} from 'express';





(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT

  app.get('/filteredimage', async (req: Request, res: Response) => {
    var picture = req.query.image_url;

    if (isUrl(picture)) {
      let pictureGrap = await filterImageFromURL(picture);

      console.log("hier ist das Bild" + pictureGrap);

      res.sendFile(pictureGrap, () => {
        /* fs.readFile(pictureGrap, async function (err, data) {
          if (err) throw err // Fail if the file can't be read.
          res.writeHead(200, { 'Content-Type': 'image/jpeg' })
          res.end(data) // Send the file data to the browser.  
          })*/
        //löschen des Bildes

        deleteLocalFiles([pictureGrap]);
      });
    }
    else {
      console.log("das ist keine URL");
      return res.status(404).send('kein bild');
    }

  });


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

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();