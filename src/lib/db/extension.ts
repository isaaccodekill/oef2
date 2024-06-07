import { Prisma } from "@prisma/client";
import { inspect } from "util";


export const queryLogger = Prisma.defineExtension({
    name: 'queryLogger',
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                const start = performance.now();
                const result = await query(args);
                const end = performance.now();
                const time = end - start;
                console.info(inspect({ model, operation, args, time }, { showHidden: false, depth: null, colors: true }));
                return result;
            }
        }
    }
})