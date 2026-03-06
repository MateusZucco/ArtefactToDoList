import 'server-only';
import { appRouter } from './router';

export const createSSRCaller = () => appRouter.createCaller({});