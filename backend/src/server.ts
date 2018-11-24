import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";

const connectionOpts: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "example",
  database: process.env.DB_NAME || "postgres",
  entities: [User],
  synchronize: true
};

createConnection(connectionOpts)
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(9000);

    // insert new users for test
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
      })
    );

    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
      })
    );

    console.log(
      "Express server has started on port 9000. Open http://localhost:9000/users to see results"
    );
  })
  .catch(error => console.log(error));
