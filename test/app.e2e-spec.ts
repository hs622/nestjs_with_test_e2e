import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { Login, Register } from 'src/auth/schema';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.clearDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const registerSchema: Register = {
      email: 'example@gmail.com',
      password: '12345',
      firstName: 'Joe',
      lastName: 'example',
    };
    const loginSchema: Login = {
      email: 'example@gmail.com',
      password: '12345',
    };

    describe('Register', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            password: registerSchema.password,
            firstName: registerSchema.firstName,
            lastname: registerSchema.lastName,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerSchema.email,
            firstName: registerSchema.firstName,
            lastname: registerSchema.lastName,
          })
          .expectStatus(400);
      });
      it('should throw if email and password are not provide', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: registerSchema.email,
            firstName: registerSchema.firstName,
            lastname: registerSchema.lastName,
          })
          .expectStatus(400);
      });
      it('should register', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(registerSchema)
          .expectStatus(201);
      });
    });
    describe('Login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: loginSchema.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: loginSchema.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provide', () => {
        return pactum.spec().post('/auth/login').withBody({}).expectStatus(400);
      });
      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(loginSchema)
          .expectStatus(201);
      });
    });

    // describe('Profile', () => {
      // const profileSchema: Profile = {
      //   email: 'example@gmail.com',
      //   password: '12345',
      //   firstName: 'Joe',
      //   lastName: 'example',
      // };

      // describe('should create', () => {
          // return pactum
          //   .spec()
          //   .post('/auth/register')
          //   .withBody(registerSchema)
          //   .expectStatus(201);
      // });
    // });
  });
});
