import { Injectable, NestMiddleware, Res, Req } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(
    @Req() req: Request,
    @Res() res: Response,
    next: () => void
  ): Promise<void> {
    const headers = req.headers;

    if (
      !headers['authorization'] ||
      !headers['authorization'].toLowerCase().startsWith('bearer ')
    ) {
      return;
    }

    const token = headers['authorization'].substr(7);

    const response = await axios.post('http://localhost:4000/auth/verify', {
      access_token: token,
    });
    req['userId'] = response.data.message.id;

    next();
  }
}
