import { Request, Response, Router } from "express";
import torrentStream from "torrent-stream";

import trackers from "../config/trackers";
import generateMagnet from "../helpers/magnet";

const streamRouter = Router();

streamRouter.get("/:magnet", (req: Request, res: Response) => {
  const magnetLink: string = decodeURIComponent(req.params.magnet);

  var engine = torrentStream(magnetLink);

  engine.on("ready", function () {
    // check if any file is a video types such as mp4, mkv, etc.
    var file: any = engine.files.find((file: any) => {
      return file.name.endsWith(".mp4");
    });

    var stream = file.createReadStream();

    res.setHeader("Content-Type", "video/mp4");
    stream.pipe(res);
  });
});

streamRouter.get("/:hash/:name", (req: Request, res: Response) => {
  const hash: string = req.params.hash;
  const name: string = req.params.name;
  const magnetLink: string = generateMagnet(hash, name, trackers);

  var engine = torrentStream(magnetLink);

  engine.on("ready", function () {
    // check if any file is a video types such as mp4, mkv, etc.
    var file: any = engine.files.find((file: any) => {
      return file.name.endsWith(".mp4");
    });

    var stream = file.createReadStream();

    res.setHeader("Content-Type", "video/mp4");
    stream.pipe(res);

    // end the stream if the client disconnects
    res.on("close", () => {
      stream.destroy();
    });
  });
});

export default streamRouter;
