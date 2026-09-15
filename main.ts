/*
import {checkHealth} from "./src/shared/health";

const health = checkHealth();
console.log(`Status: ${health.status}, Timestamp: ${health.timestamp}`);
*/

import { buildServer } from "@/infrastructure/http/server";

const port = Number(process.env.PORT ?? 3000);
buildServer().then(app => app.listen({port}));