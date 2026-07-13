/* src/prisma/prisma.service.ts: */
import {
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        const urlBaseDatos = configService.get<string>('DATABASE_URL');

        if (!urlBaseDatos) {
            throw new Error(
                'La variable de entorno DATABASE_URL no está definida.',
            );
        }

        const adapter = new PrismaPg({
            connectionString: urlBaseDatos,
        });

        super({
            adapter,
            omit: {
                usuario: {
                    contrasenaHash: true,
                },
            },
        });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }
}