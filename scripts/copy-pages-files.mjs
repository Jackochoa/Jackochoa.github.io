import { copyFileSync } from "node:fs";

copyFileSync("public/CNAME", "out/CNAME");
