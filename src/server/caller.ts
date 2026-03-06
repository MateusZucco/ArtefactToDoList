import 'server-only';
import { appRouter } from './router';

// Se você estiver usando o App Router, o ideal é criar o caller 
// dentro de uma função ou garantir que ele só exista no servidor.
export const createSSRCaller = () => appRouter.createCaller({});