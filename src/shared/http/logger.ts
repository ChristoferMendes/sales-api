import { AppDataSource } from 'src/data-source';
import { app } from './app';

export function Logger() {
  const blueBash = '\x1B[36m';
  const greenBash = '\x1B[32m';
  const redBash = `\x1B[31m`;

  const port = 3333;

  AppDataSource.initialize()
    .then(() => {
      app.listen(port, () => console.log(`${blueBash}Running on ${port}`));
      console.log(`${greenBash}Conected to the database ✅`);
    })
    .catch(() => {
      console.log(
        `${redBash}Error while trying to connect to the database ❌! Try to run the server again and check if the db container is up `,
      );
    });
}
