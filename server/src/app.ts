import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";

interface user {
  email: string;
  password: string;
}

const app = express()

const users: user[] = [
  {
    email: "teste@email.com",
    password: "teste12345"
  }
]

const saltRounds = 10;

app.use(express.json())

app.use(cors())

app.get('/users', (_request: Request, response: Response) => {
  response.json(users)
})

app.post('/users', async (request: Request, response: Response) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(request.body.password, salt)
    const user = {
      email: request.body.email,
      password: hash
    }
    users.push(user)
    response.status(200).json(user)
  } catch (error) {
    response.status(500).send(error)
  }
  
})

app.post('/users/login', async (request: Request, response: Response) => {
  const user = users.find(user => user.email === request.body.email);
  if (user === undefined) {
    return response.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(request.body.password, user.password)) {
     response.send('Success')
    } else {
      response.send('Error')
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

export default app;