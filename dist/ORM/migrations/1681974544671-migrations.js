"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1681974544671 = void 0;
class Migrations1681974544671 {
    constructor() {
        this.name = 'Migrations1681974544671';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`tbl_admin\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`userName\` varchar(50) NULL, \`Password\` varchar(200) NULL, \`isMainAdmin\` tinyint NOT NULL DEFAULT 0, \`PermissionType\` varchar(30) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE \`tbl_admin\``);
        });
    }
}
exports.Migrations1681974544671 = Migrations1681974544671;
