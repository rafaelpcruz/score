import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.init();

  app.use(
    session({
      secret: process.env.SECRET || 'ifc-archetype',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 3000;

  await app.listen(port).then(() => console.log(`Application listening on port ${port}`));
}

bootstrap();
