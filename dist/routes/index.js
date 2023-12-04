import { Router } from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
const appRouter = Router();
// .use for generating middleware
appRouter.use('/user', userRoutes); // ../api/v1/user
appRouter.use('/chat', chatRoutes); // ../api/v1/chat
export default appRouter;
//# sourceMappingURL=index.js.map